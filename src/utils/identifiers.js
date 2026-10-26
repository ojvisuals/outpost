// Turns whatever came from the camera or the keyboard into a clean identifier.

const GTIN_LENGTHS = [8, 12, 13, 14];

/** Standard GS1 mod-10 check digit validation. */
export function gtinChecksumValid(digits) {
  const nums = digits.split('').map(Number);
  const check = nums.pop();
  let sum = 0;
  nums.reverse().forEach((n, i) => {
    sum += n * (i % 2 === 0 ? 3 : 1);
  });
  return (10 - (sum % 10)) % 10 === check;
}

/** QR codes may hold a GS1 Digital Link URL such as https://example.com/01/06154000123451 */
export function extractCandidate(raw) {
  const text = String(raw ?? '').trim();
  if (/^https?:\/\//i.test(text)) {
    const link = text.match(/\/01\/(\d{8,14})(?:[/?#]|$)/);
    if (link) return link[1];
  }
  return text;
}

export function normalizeInput(raw) {
  return extractCandidate(raw)
    .toUpperCase()
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s+/g, '');
}

/**
 * @returns {{ok: true, type: 'gtin'|'nafdac', value: string} | {ok: false, reason: string, message: string}}
 */
export function classifyIdentifier(raw) {
  const s = normalizeInput(raw);
  if (!s) {
    return { ok: false, reason: 'empty', message: 'Enter a NAFDAC number to continue.' };
  }
  // Digits-only values of GTIN length are treated as barcodes.
  if (/^\d+$/.test(s) && GTIN_LENGTHS.includes(s.length)) {
    return gtinChecksumValid(s)
      ? { ok: true, type: 'gtin', value: s }
      : {
          ok: false,
          reason: 'checksum',
          message: 'This barcode number doesn’t look right. Check the digits and try again.',
        };
  }
  const nafdac = s.match(/^([A-Z0-9]{2})-?(\d{3,6})$/);
  if (nafdac) {
    return { ok: true, type: 'nafdac', value: `${nafdac[1]}-${nafdac[2]}` };
  }
  return {
    ok: false,
    reason: 'format',
    message: 'That doesn’t match the usual format. A NAFDAC number looks like A1-123456.',
  };
}
