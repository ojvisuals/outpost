import { classifyIdentifier } from '../../utils/identifiers.js';
import { mockProvider } from './providers/mockProvider.js';
import { apiProvider } from './providers/apiProvider.js';
import { VerificationError } from './errors.js';

export { VerificationError };

const providers = { mock: mockProvider, api: apiProvider };
const active = providers[import.meta.env.VITE_VERIFICATION_PROVIDER ?? 'mock'] ?? mockProvider;

/**
 * The only function the UI calls to verify a product.
 * The UI doesn't know (or care) whether the answer comes from mock data, a backend, GS1 or NAFDAC.
 *
 * @param {string} rawInput  A scanned code or typed NAFDAC number
 * @returns {Promise<import('../../types/index.js').VerificationResult>}
 * @throws {VerificationError}
 */
export async function verifyProduct(rawInput) {
  const parsed = classifyIdentifier(rawInput);
  if (!parsed.ok) throw new VerificationError('INVALID_INPUT', parsed.message);
  return active.verify({ type: parsed.type, value: parsed.value });
}

export const isDemoProvider = active.name === 'mock';
