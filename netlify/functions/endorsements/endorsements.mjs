/* ------------------------------------------------------------------ */
/*  Endorsements API — Netlify Function                                 */
/*  GET  /.netlify/functions/endorsements?skill=Python                  */
/*  POST /.netlify/functions/endorsements                               */
/*                                                                      */
/*  Public responses expose ONLY id, name, role, email and date.         */
/*  Suggestions/compliments are private — emailed to the owner, never    */
/*  returned to the browser.                                             */
/* ------------------------------------------------------------------ */
import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER_EMAIL = process.env.PORTFOLIO_OWNER_EMAIL || 'srinikeshchinta@gmail.com';
const EMAIL_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';

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

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

function json(statusCode, payload, extraHeaders = {}) {
  return { statusCode, headers: { ...corsHeaders(), ...extraHeaders }, body: JSON.stringify(payload) };
}

/* Public shape is deliberately minimal: no suggestion, no ip, no consent,
   no status, no internal ids beyond the record id used as a React key. */
function toPublic(record) {
  return {
    id: record.id,
    name: record.name,
    role: record.role,
    email: record.email || '',
    date: record.date || record.createdAt,
  };
}

/* --------------------------- email notify -------------------------- */
async function sendNotification(record, skillName) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[endorsements] RESEND_API_KEY not set — skipping email notification.');
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const when = new Date(record.date || record.createdAt);
    const datePart = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(when);
    const timePart = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(when);
    const submitted = `${datePart}, ${timePart} IST`;

    const text = [
      'New Skill Endorsement',
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
      'Suggestion:',
      record.suggestion ? record.suggestion : 'No suggestion provided.',
      '',
      'Submitted:',
      submitted,
    ].join('\n');

    // Resend resolves with { data, error } instead of throwing on API errors
    // (bad key, unverified sender, domain not configured) — surface those as
    // failures instead of silently logging a false success.
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [OWNER_EMAIL],
      subject: `New Portfolio Skill Endorsement — ${skillName}`,
      text,
    });
    if (error) {
      console.error('[endorsements] Email notification failed:', error.message);
      return;
    }
    console.log(`[endorsements] Email notification sent for ${skillName} (id: ${data?.id ?? 'n/a'})`);
  } catch (err) {
    console.error('[endorsements] Email notification failed:', err?.message || err);
  }
}

/* ---------------------------- handlers ----------------------------- */
export async function handler(event) {
  const method = event.httpMethod || 'GET';

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  if (method === 'GET') {
    const skill = clean(event.queryStringParameters?.skill, 64);
    const all = await readAll();
    if (!skill) {
      const counts = {};
      for (const r of all.records) counts[r.skill] = (counts[r.skill] || 0) + 1;
      return json(200, { counts });
    }
    const endorsements = all.records
      .filter((r) => r.skill === skill && r.email)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(toPublic);
    return json(200, { skill, count: endorsements.length, endorsements });
  }

  if (method === 'POST') {
    let payload;
    try {
      payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch {
      return json(400, { error: 'Invalid JSON body.' });
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
      return json(422, { error: 'Validation failed.', fields: errors });
    }

    const all = await readAll();
    const now = Date.now();
    const ip = clientIp(event);

    // Duplicate submission protection — one endorsement per email per skill.
    const already = all.records.some((r) => r.skill === skill && r.email === email);
    if (already) {
      return json(409, { error: "You've already endorsed this skill. Thank you!" });
    }

    // Basic rate limiting — max 5 endorsements per hour per IP.
    const hourAgo = now - 3600 * 1000;
    const recentFromIp = all.records.filter((r) => r.ip === ip && Date.parse(r.date) > hourAgo).length;
    if (recentFromIp >= 5) {
      return json(429, { error: 'Too many endorsements from this device. Please try again later.' });
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
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
    };

    all.records.push(record);
    await writeAll(all);

    // Email notification — awaited so serverless doesn't terminate it mid-flight.
    // sendNotification catches its own errors, so a failure can't fail the response.
    await sendNotification(record, skill);

    const count = all.records.filter((r) => r.skill === skill).length;
    return json(201, { ok: true, skill, count, endorsement: toPublic(record) });
  }

  return json(405, { error: 'Method not allowed.' });
}
