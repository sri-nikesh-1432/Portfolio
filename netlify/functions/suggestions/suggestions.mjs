/* ------------------------------------------------------------------ */
/*  Suggestions API — Netlify Function                                 */
/*  POST /.netlify/functions/suggestions                               */
/*                                                                     */
/*  Collects "Suggest an Idea" submissions from the Building section,   */
/*  validates server-side, rate-limits, dedupes, persists the record    */
/*  and emails the portfolio owner (reply-to = visitor email).          */
/* ------------------------------------------------------------------ */
import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER_EMAIL =
  process.env.SUGGESTION_RECIPIENT ||
  process.env.ENDORSEMENT_RECIPIENT ||
  process.env.PORTFOLIO_OWNER_EMAIL ||
  'srinikeshchinta@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.RESEND_FROM || 'onboarding@resend.dev';
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;

/* ------------------------- storage adapter ------------------------- */
// Same persistence strategy as the endorsements function:
//   1. Netlify Blobs (platform-injected context),
//   2. Netlify Blobs with explicit siteID + token env vars,
//   3. local JSON file for plain `npm run dev`.
const DATA_FILE = path.join(process.cwd(), '.data', 'suggestions.json');
const STORE_NAME = 'suggestions';

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
  try {
    const store = getStore({ name: STORE_NAME });
    await store.get('__probe__');
    blobStore = store;
    storageMode = 'blobs';
    return blobStore;
  } catch {
    /* fall through to explicit config */
  }
  const explicit = blobStoreWithExplicitConfig();
  if (explicit) {
    try {
      await explicit.get('__probe__');
      blobStore = explicit;
      storageMode = 'blobs';
      return blobStore;
    } catch (err) {
      console.error('[suggestions] Blob store with explicit config failed:', err?.message || err);
    }
  }
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
    throw new Error('Suggestion storage is not configured for this runtime.');
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

/* --------------------------- email notify -------------------------- */
async function sendNotification(record, retries = 1) {
  if (!EMAIL_API_KEY) {
    // Never report a fake success: without a key the email cannot be sent, so
    // fail loudly in every environment (dev included) instead of skipping.
    throw new Error(
      'Email service is not configured (EMAIL_API_KEY missing). Add it to your .env file (dev) or Netlify environment variables (production).'
    );
  }
  if (EMAIL_FROM === 'onboarding@resend.dev') {
    console.warn(
      '[SUGGESTION] EMAIL_FROM is unset — using onboarding@resend.dev. Resend only delivers from this sender to the account owner; set EMAIL_FROM to a verified sender for reliable delivery.'
    );
  }

  const when = new Date(record.createdAt);
  const submitted = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(when) + ' IST';

  const text = [
    'NEW PROJECT SUGGESTION',
    '',
    `Project: ${record.project || 'General'}`,
    '',
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    record.role ? `Role: ${record.role}` : '',
    '',
    'Suggestion:',
    record.idea,
    '',
    `Submitted: ${submitted}`,
    '',
    'Portfolio:',
    'Datta Srinikesh Chinta',
    '',
    '--------------------------------',
    'This message was submitted through the Datta Srinikesh Chinta portfolio.',
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; background:#f4ebdc; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid rgba(51,34,15,0.14); border-radius:16px; padding:28px;">
        <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#a58d68; margin:0 0 12px;">New Project Suggestion</p>
        <h2 style="color:#33220f; margin:0 0 20px; font-size:22px;">Someone suggested an idea for what you build next.</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#4e3a22;">
          <tr><td style="padding:6px 0; color:#a58d68; width:110px;">Project</td><td style="padding:6px 0;"><b>${escapeHtml(record.project || 'General')}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Name</td><td style="padding:6px 0;"><b>${escapeHtml(record.name)}</b></td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Email</td><td style="padding:6px 0;"><b>${escapeHtml(record.email)}</b></td></tr>
          ${record.role ? `<tr><td style="padding:6px 0; color:#a58d68;">Role</td><td style="padding:6px 0;"><b>${escapeHtml(record.role)}</b></td></tr>` : ''}
          <tr><td style="padding:6px 0; color:#a58d68; vertical-align:top;">Suggestion</td><td style="padding:6px 0;">${escapeHtml(record.idea).replace(/\n/g, '<br/>')}</td></tr>
          <tr><td style="padding:6px 0; color:#a58d68;">Submitted</td><td style="padding:6px 0;">${submitted}</td></tr>
        </table>
        <p style="margin:24px 0 0; font-size:12px; color:#7c6443; border-top:1px solid rgba(51,34,15,0.14); padding-top:14px;">
          This message was submitted through the Datta Srinikesh Chinta portfolio.
        </p>
      </div>
    </div>`;

  const resend = new Resend(EMAIL_API_KEY);
  const attempts = Math.max(1, retries + 1);
  let lastError = null;
  console.log('[SUGGESTION] Sending email');
  for (let i = 0; i < attempts; i += 1) {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: [OWNER_EMAIL],
        reply_to: record.email,
        subject: 'New Portfolio Project Suggestion',
        text,
        html,
      });
      if (error) {
        lastError = new Error(error.message);
      } else {
        console.log(`[SUGGESTION] Email provider response received (id: ${data?.id ?? 'n/a'})`);
        console.log('[SUGGESTION] Email accepted successfully');
        return;
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
    if (i < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 400 * (i + 1)));
    }
  }
  throw lastError || new Error('Email notification failed.');
}

/* ---------------------------- handler ------------------------------ */
export async function handler(event) {
  const method = event.httpMethod || 'GET';

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }

  if (method !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' }, event);
  }

  console.log('[SUGGESTION] Request received');
  let payload;
  try {
    payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch {
    return json(400, { success: false, message: 'Invalid JSON body.' }, event);
  }

  const name = clean(payload?.name, 80);
  const email = clean(payload?.email, 254).toLowerCase();
  const idea = clean(payload?.idea ?? payload?.message ?? payload?.suggestion, 2000);
  const role = clean(payload?.role, 100);
  const project = clean(payload?.project, 100);

  const errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!idea) errors.idea = 'Please describe your idea or suggestion.';

  if (Object.keys(errors).length) {
    return json(422, { success: false, message: 'Validation failed.', fields: errors }, event);
  }
  console.log('[SUGGESTION] Validation passed');

  const all = await readAll();
  const now = Date.now();
  const ip = clientIp(event);

  // Duplicate protection — one delivered suggestion per email per day.
  // Records whose email never got delivered (status !== 'email_sent') do not
  // count, so the visitor can retry after a provider failure.
  const dayAgo = now - 24 * 3600 * 1000;
  const already = all.records.some(
    (r) => r.email === email && r.status === 'email_sent' && Date.parse(r.createdAt) > dayAgo
  );
  if (already) {
    return json(409, { success: false, message: 'You have already submitted a suggestion recently. Thank you!' }, event);
  }

  // Rate limiting — max 5 suggestions per hour per IP.
  const hourAgo = now - 3600 * 1000;
  const recentFromIp = all.records.filter((r) => r.ip === ip && Date.parse(r.createdAt) > hourAgo).length;
  if (recentFromIp >= 5) {
    return json(429, { success: false, message: 'Too many requests. Please try again later.' }, event);
  }

  const record = {
    id: randomUUID(),
    name,
    email,
    idea,
    role: role || undefined,
    project: project || undefined,
    ip,
    status: 'email_pending',
    createdAt: new Date().toISOString(),
  };

  // Store first (status: email_pending) so a suggestion is never silently
  // lost and the status field lets us diagnose delivery failures. Then send
  // the email; on success flip the status to email_sent, on failure mark it
  // email_failed and return 500 so the visitor can retry.
  all.records.push(record);
  try {
    await writeAll(all);
  } catch (err) {
    console.error('[SUGGESTION] Storage failed:', err?.message || err);
    return json(500, { success: false, message: 'Unable to send your suggestion right now. Please try again.' }, event);
  }

  try {
    await sendNotification(record);
  } catch (err) {
    console.error('[SUGGESTION] Email provider error:', err?.message || err);
    record.status = 'email_failed';
    await writeAll(all).catch(() => {});
    // Surface the specific failure (e.g. a missing EMAIL_API_KEY) so the
    // visitor/owner sees what to fix instead of a generic error.
    const detail = err instanceof Error ? err.message : null;
    return json(
      500,
      {
        success: false,
        message: detail || 'Unable to send your suggestion right now. Please try again.',
      },
      event
    );
  }

  record.status = 'email_sent';
  await writeAll(all).catch(() => {});

  console.log(`[SUGGESTION] Suggestion stored (${record.id})`);
  return json(201, {
    success: true,
    message: 'Suggestion sent successfully.',
    suggestion: { id: record.id, createdAt: record.createdAt, status: record.status },
  }, event);
}
