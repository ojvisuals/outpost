import { VerificationError } from '../errors.js';

/**
 * PLACEHOLDER for the future Scana backend. It is NOT connected to anything.
 *
 * Intended contract (backend does the GS1 + NAFDAC work, keeps all credentials server-side):
 *   POST {VITE_SCANA_API_URL}/v1/verify
 *   body:     { "identifier": { "type": "gtin" | "nafdac", "value": "..." } }
 *   200:      a VerificationResult (see src/types/index.js)
 *   404/422:  { "code": "UNAVAILABLE" | "INVALID_INPUT" }
 *
 * The frontend must never hold GS1 or NAFDAC keys.
 */
export const apiProvider = {
  name: 'api',
  async verify(identifier) {
    const base = import.meta.env.VITE_SCANA_API_URL;
    if (!base) {
      throw new VerificationError('NETWORK', 'No verification backend is configured yet.');
    }
    let response;
    try {
      response = await fetch(`${base}/v1/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });
    } catch {
      throw new VerificationError('NETWORK', 'The verification service could not be reached.');
    }
    if (response.ok) return response.json();
    const problem = await response.json().catch(() => ({}));
    throw new VerificationError(problem.code ?? 'NETWORK', 'The verification service returned an error.');
  },
};
