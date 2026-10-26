import {
  DEMO_PRODUCTS,
  DEMO_INSUFFICIENT,
  DEMO_UNAVAILABLE_GTINS,
  DEMO_OFFLINE_GTIN,
  DEMO_SOURCE,
} from '../../../data/mockProducts.js';
import { VerificationError } from '../errors.js';
import { makeId } from '../../../utils/format.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function toProduct(p) {
  return {
    name: p.name,
    variant: p.variant,
    manufacturer: p.manufacturer,
    category: p.category,
    gtin: p.gtin,
    imageTone: p.imageTone,
  };
}

/** Synchronous core, also used to seed the demo history. */
export function buildResult({ type, value }) {
  const base = {
    id: makeId(),
    identifier: { type, value },
    checkedAt: new Date().toISOString(),
    source: DEMO_SOURCE,
  };

  if (type === 'gtin') {
    if (value === DEMO_OFFLINE_GTIN) {
      throw new VerificationError('NETWORK', 'The verification service could not be reached.');
    }
    if (DEMO_UNAVAILABLE_GTINS.includes(value)) {
      throw new VerificationError('UNAVAILABLE', 'No result can be produced for this identifier yet.');
    }
    const match = DEMO_PRODUCTS.find((p) => p.gtin === value);
    if (match) {
      return { ...base, status: 'registered', product: toProduct(match), nafdac: match.nafdac, reasons: [] };
    }
    const partial = DEMO_INSUFFICIENT.find((p) => p.gtin === value);
    if (partial) {
      return { ...base, status: 'insufficient', product: toProduct(partial), nafdac: null, reasons: ['NO_REGISTRATION_LINK'] };
    }
    return { ...base, status: 'not_verified', product: null, nafdac: null, reasons: ['NOT_IN_RECORDS'] };
  }

  const match = DEMO_PRODUCTS.find((p) => p.nafdac.number === value);
  if (match) {
    return { ...base, status: 'registered', product: toProduct(match), nafdac: match.nafdac, reasons: [] };
  }
  return { ...base, status: 'not_verified', product: null, nafdac: null, reasons: ['NOT_IN_RECORDS'] };
}

export const mockProvider = {
  name: 'mock',
  /** @param {import('../../../types/index.js').Identifier} identifier */
  async verify(identifier) {
    await sleep(1600); // long enough to read the loading steps, short enough not to annoy
    return buildResult(identifier);
  },
};
