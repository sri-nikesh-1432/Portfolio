/* Frontend client for the endorsement API (Netlify Function in prod,
   Vite dev middleware on localhost:5173). */

export interface PublicEndorsement {
  id: string;
  name: string;
  role: string;
  email: string;
  date: string;
}

export interface EndorsementSubmission {
  skill: string;
  name: string;
  role: string;
  email: string;
  suggestion?: string;
  consent: boolean;
}

export const ENDORSEMENTS_URL = '/.netlify/functions/endorsements';

export class EndorsementError extends Error {
  fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'EndorsementError';
    this.fields = fields;
  }
}

export interface SkillEndorsements {
  skill: string;
  count: number;
  endorsements: PublicEndorsement[];
}

export async function fetchSkillEndorsements(skill: string): Promise<SkillEndorsements> {
  const res = await fetch(`${ENDORSEMENTS_URL}?skill=${encodeURIComponent(skill)}`);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new EndorsementError(data?.error || 'Failed to load endorsements.');
  }
  return data as SkillEndorsements;
}

/** Fetches the endorsement count for every skill in a single request. */
export async function fetchAllEndorsementCounts(): Promise<Record<string, number>> {
  const res = await fetch(ENDORSEMENTS_URL);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new EndorsementError(data?.error || 'Failed to load endorsement counts.');
  }
  return (data?.counts ?? {}) as Record<string, number>;
}

export async function submitEndorsement(
  payload: EndorsementSubmission
): Promise<{ ok: true; skill: string; count: number }> {
  const res = await fetch(ENDORSEMENTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new EndorsementError(data?.error || 'Something went wrong.', data?.fields);
  }
  return data as { ok: true; skill: string; count: number };
}
