/* Frontend client for the suggestion API (Netlify Function in prod,
   Vite dev middleware on localhost:5173). */

export interface SuggestionSubmission {
  name: string;
  email: string;
  idea: string;
  role?: string;
  project?: string;
}

export class SuggestionError extends Error {
  fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'SuggestionError';
    this.fields = fields;
  }
}

export const SUGGESTIONS_URL = '/.netlify/functions/suggestions';

export async function submitSuggestion(
  payload: SuggestionSubmission
): Promise<{ success: true; message: string }> {
  const res = await fetch(SUGGESTIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new SuggestionError(
      data?.message || 'Unable to send your suggestion right now. Please try again.',
      data?.fields
    );
  }
  return data as { success: true; message: string };
}
