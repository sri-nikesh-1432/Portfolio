/* ------------------------------------------------------------------ */
/*  Endorsements API — Netlify Function                                 */
/*  GET  /.netlify/functions/endorsements?skill=Python                  */
/*  POST /.netlify/functions/endorsements                               */
/*                                                                      */
/*  Public responses expose ONLY id, name, role and date. The endorser's */
/*  email, IP and suggestion/compliment are private — they are emailed   */
/*  to the owner and never returned to the browser.                      */
/* ------------------------------------------------------------------ */
import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER_EMAIL =
  process.env.ENDORSEMENT_RECIPIENT ||
  process.env.PORTFOLIO_OWNER_EMAIL ||
  'srinikeshchinta@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.RESEND_FROM || 'onboarding@resend.dev';
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;

/* ------------------------- storage adapter ------------------------- */
// Persistence order:
//   1. Netlify Blobs with the platform-injected context (auto-config), and
//   2. Netlify Blobs with explicit siteID + token env vars (NETLIFY_SITE_ID /
//      NETLIFY_API_TOKEN) — used when the runtime does not inject blob
//      context (e.g. legacy runtimeAPIVersion 1 functions), and
//   3. a local JSON file, only for plain `npm run dev` (Vite middleware).
const DATA_FILE = path.join(process.cwd(), '.data', 'endorsements.json');
const STORE_NAME = 'endorsements';

let storageMode = null; // 'blobs' | 'file'
let blobStore = null;

function blobStoreWithExplicitConfig() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN;
  if (!siteID || !token) return null;
  return getStore(STORE_NAME, { siteID, token });
}

async function getBlobStore() {
  if (blobStore) return blobStore;
  // 1. Platform-injected context (runtime sets globalThis.netlifyBlobsContext
  //    or the NETLIFY_BLOBS_CONTEXT env var before invoking the handler).
  try {
    const store = getStore({ name: STORE_NAME });
    await store.get('__probe__');
    blobStore = store;
    storageMode = 'blobs';
    return blobStore;
  } catch {
    /* fall through to explicit config */
  }
  // 2. Explicit siteID + token (a Netlify personal access token set as an
  //    env var server-side; the runtime never exposes it to the browser).
  const explicit = blobStoreWithExplicitConfig();
  if (explicit) {
    try {
      await explicit.get('__probe__');
      blobStore = explicit;
      storageMode = 'blobs';
      return blobStore;
    } catch (err) {
      console.error('[endorsements] Blob store with explicit config failed:', err?.message || err);
    }
  }
  // 3. Local file (dev only). In the Lambda runtime the filesystem is read-only,
  //    so writing must fail loudly rather than crash on an unhelpful ENOENT.
  storageMode = 'file';
  return null;
}

async function readAll() {
  const store = await getBlobStore();
  if (store) {
    try {
      const raw = await store.get('all');
      return raw ? JSON.parse(raw) : { records: [] };
    } catch {
      return { records: [] };
    }
  }
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { records: [] };
  }
}

async function writeAll(data) {
  const store = await getBlobStore();
  if (store) {
    await store.set('all', JSON.stringify(data));
    return;
  }
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    throw new Error('Endorsement storage is not configured for this runtime.');
  }
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* ---------------------------- helpers ------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLen);
}

function clientIp(event) {
  const fwd = event.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return event.headers?.['x-nf-client-connection-ip'] || event.requestContext?.identity?.sourceIp || 'unknown';
}

function corsHeaders(event) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  // Same-origin requests (the deployed portfolio) don't need CORS headers at
  // all; only echo an origin when it is a known dev origin or the configured
  // production origin (ALLOWED_ORIGIN). Never wildcard in production.
  const origin = event?.headers?.['origin'];
  const allowed = process.env.ALLOWED_ORIGIN;
  const isDevOrigin = typeof origin === 'string' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin && (isDevOrigin || (allowed && origin === allowed))) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function json(statusCode, payload, event, extraHeaders = {}) {
  return { statusCode, headers: { ...corsHeaders(event), ...extraHeaders }, body: JSON.stringify(payload) };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Public shape is deliberately minimal: no email, no suggestion, no ip, no
   consent, no status — only what is safe to show publicly. */
function toPublic(record) {
  return {
    id: record.id,
    name: record.name,
    role: record.role,
    date: record.date || record.createdAt,
  };
}

/* --------------------------- email notify -------------------------- */
async function sendNotification(record, skillName) {
  if (!EMAIL_API_KEY) {
    // Never report a fake success: without a key the email cannot be sent, so
    // fail loudly in every environment (dev included) instead of skipping.
    throw new Error(
      'Email service is not configured (EMAIL_API_KEY missing). Add it to your .env file (dev) or Netlify environment variables (production).'
    );
  }
  if (EMAIL_FROM === 'onboarding@resend.dev') {
    console.warn(
      '[ENDORSEMENT] EMAIL_FROM is unset — using onboarding@resend.dev. Resend only delivers from this sender to the account owner; set EMAIL_FROM to a verified sender for reliable delivery.'
    );
  }

  const when = new Date(record.date || record.createdAt);
  const submitted =
    new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(when) + ' IST';

  const text = [
    'NEW SKILL ENDORSEMENT',
    '',
    'Skill:',
    skillName,
    '',
    'Name:',
    record.name,
    '',
    'Role:',
    record.role,
    '',
    'Email:',
    record.email,
    '',
    'Compliment:',
    record.suggestion ? record.suggestion : 'No compliment provided.',
    '',
    'Submitted:',
    submitted,
    '',
    'Portfolio:',
    'Datta Srinikesh Chinta',
  ].join('\n');

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; background:#f4ebdc; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid rgba(51,34,15,0.14); border-radius:16px; padding:28px;">
        <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#a58d68; margin:0 0 12px;">New Skill Endorsement</p>
        <h2 style="color:#33220f; margin:0 0 20px; font-size:22px;">${escapeHtml(record.name)} endorsed your <span style="color:#c9a24b;">${escapeHtml(skillName)}</span> skill.</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#4e3a22;">
          <tr><td style="padding:6px 0; color:#a58d68; width:110px;">Skill</td><td style="padding:6px 0;"><b>${escapeHtml(skillName)}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Name</td><td style="padding:6px 0;"><b>${escapeHtml(record.name)}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Role</td><td style="padding:6px 0;"><b>${escapeHtml(record.role)}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Email</td><td style="padding:6px 0;"><b>${escapeHtml(record.email)}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68; vertical-align:top;">Compliment</td><td style="padding:6px 0;">${escapeHtml(record.suggestion || 'No compliment provided.')}</td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Submitted</td><td style="padding:6px 0;">${submitted}</td></tr>
        </table>
        <p style="margin:24px 0 0; font-size:12px; color:#7c6443; border-top:1px solid rgba(51,34,15,0.14); padding-top:14px;">
          This is an automated notification from the Datta Srinikesh Chinta portfolio.
        </p>
      </div>
    </div>`;

  const resend = new Resend(EMAIL_API_KEY);
  // Bounded retry: at most 2 attempts with a short backoff. Resend resolves
  // with { data, error } instead of throwing on API errors (bad key,
  // unverified sender, domain not configured), so those are surfaced too.
  let lastError = null;
  console.log('[ENDORSEMENT] Sending email');
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: [OWNER_EMAIL],
        reply_to: record.email,
        subject: `New Skill Endorsement — ${skillName}`,
        text,
        html,
      });
      if (error) {
        lastError = new Error(error.message);
      } else {
        console.log(`[ENDORSEMENT] Email provider response received (id: ${data?.id ?? 'n/a'})`);
        console.log('[ENDORSEMENT] Email accepted successfully');
        return;
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
  throw lastError || new Error('Email notification failed.');
}

/* ---------------------------- handlers ----------------------------- */
export async function handler(event) {
  const method = event.httpMethod || 'GET';

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }

  if (method === 'GET') {
    const skill = clean(event.queryStringParameters?.skill, 64);
    const all = await readAll();
    if (!skill) {
      const counts = {};
      for (const r of all.records) counts[r.skill] = (counts[r.skill] || 0) + 1;
      return json(200, { counts }, event);
    }
    const endorsements = all.records
      .filter((r) => r.skill === skill && r.email)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(toPublic);
    return json(200, { skill, count: endorsements.length, endorsements }, event);
  }

  if (method === 'POST') {
    console.log('[ENDORSEMENT] Request received');
    let payload;
    try {
      payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch {
      return json(400, { error: 'Invalid JSON body.' }, event);
    }

    const skill = clean(payload?.skill, 64);
    const name = clean(payload?.name, 80);
    const role = clean(payload?.role, 100);
    const email = clean(payload?.email, 254).toLowerCase();
    const suggestion = clean(payload?.suggestion ?? payload?.compliment, 500);
    const consent = payload?.consent === true;

    const errors = {};
    if (!skill) errors.skill = 'Skill is required.';
    if (!name) errors.name = 'Please enter your name.';
    if (!role) errors.role = 'Please enter your role or position.';
    if (!email) errors.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
    if (!consent) errors.consent = 'Please agree to display your name, role and email.';

    if (Object.keys(errors).length) {
      return json(422, { error: 'Validation failed.', fields: errors }, event);
    }
    console.log('[ENDORSEMENT] Validation passed');

    const all = await readAll();
    const now = Date.now();
    const ip = clientIp(event);

    // Duplicate submission protection — one endorsement per email per skill.
    // Records whose email never got delivered (emailStatus !== 'email_sent')
    // do not count, so the visitor can retry after a provider failure.
    const already = all.records.some(
      (r) => r.skill === skill && r.email === email && r.emailStatus === 'email_sent'
    );
    if (already) {
      return json(409, { error: "You've already endorsed this skill. Thank you!" }, event);
    }

    // Basic rate limiting — max 5 endorsements per hour per IP.
    const hourAgo = now - 3600 * 1000;
    const recentFromIp = all.records.filter((r) => r.ip === ip && Date.parse(r.date) > hourAgo).length;
    if (recentFromIp >= 5) {
      return json(429, { error: 'Too many endorsements from this device. Please try again later.' }, event);
    }

    const record = {
      id: randomUUID(),
      skill,
      name,
      role,
      email,
      suggestion: suggestion || undefined,
      consent,
      ip,
      status: 'approved',
      emailStatus: 'email_pending',
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
    };

    all.records.push(record);
    await writeAll(all);

    // Email notification — awaited so serverless doesn't terminate it mid-flight.
    // Per spec, an endorsement only counts as successful when the email
    // notification workflow has also succeeded. The record is kept either way
    // (never silently lost); its emailStatus tells us whether the owner was
    // actually notified, and a failed record can be retried by the visitor.
    try {
      await sendNotification(record, skill);
    } catch (err) {
      console.error('[ENDORSEMENT] Email provider error:', err?.message || err);
      record.emailStatus = 'email_failed';
      await writeAll(all).catch(() => {});
      // Surface the specific failure (e.g. a missing EMAIL_API_KEY) so the
      // visitor/owner sees what to fix instead of a generic error.
      const detail = err instanceof Error ? err.message : null;
      return json(
        500,
        {
          error: detail || 'The endorsement could not be completed. Please try again.',
          success: false,
          message: detail || 'The endorsement could not be completed. Please try again.',
        },
        event
      );
    }

    record.emailStatus = 'email_sent';
    await writeAll(all).catch(() => {});

    const count = all.records.filter((r) => r.skill === skill).length;
    return json(201, { ok: true, skill, count, endorsement: toPublic(record) }, event);
  }

  return json(405, { error: 'Method not allowed.' }, event);
}
