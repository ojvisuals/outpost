// ─────────────────────────────────────────────────────────────────────────────
// DEVELOPMENT / DEMO DATA ONLY.
// Every product, manufacturer and registration number below is FICTIONAL.
// None of it comes from NAFDAC or GS1, and none of it is regulatory information.
// This file is replaced by real API responses in a later phase.
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_SOURCE = { kind: 'demo', label: 'Demo data (not live NAFDAC records)' };

/** Fully matched: barcode -> product -> NAFDAC registration. */
export const DEMO_PRODUCTS = [
  {
    gtin: '6154000123451',
    name: 'Sunvale Groundnut Oil',
    variant: '1 litre bottle',
    manufacturer: 'Brightvale Foods Nigeria Ltd.',
    category: 'Edible oils',
    imageTone: 'ochre',
    nafdac: {
      number: 'A1-123456',
      status: 'active',
      productType: 'Food',
      registeredOn: '2022-03-14',
      expiresOn: '2027-03-13',
    },
  },
  {
    gtin: '6154000234560',
    name: 'Aloe Calm Body Lotion',
    variant: '400 ml tube',
    manufacturer: 'Nuvera Personal Care Ltd.',
    category: 'Cosmetics',
    imageTone: 'sage',
    nafdac: {
      number: 'A7-205331',
      status: 'active',
      productType: 'Cosmetic',
      registeredOn: '2023-08-02',
      expiresOn: '2028-08-01',
    },
  },
];

/** Identifier is known, but the record has no NAFDAC registration number to check. */
export const DEMO_INSUFFICIENT = [
  {
    gtin: '6154000456788',
    name: 'Harvest Table Seasoning Cubes',
    variant: '100 g pack',
    manufacturer: 'Harvest Table Foods',
    category: 'Seasonings',
    imageTone: 'rose',
  },
];

/** Identifier is recognised but the record cannot produce any result right now. */
export const DEMO_UNAVAILABLE_GTINS = ['6154000912345'];

/** Special demo value that simulates the verification service being unreachable. */
export const DEMO_OFFLINE_GTIN = '6154000000004';

/** Shown on the Home and Scan screens so every outcome can be demonstrated. */
export const DEMO_SCENARIOS = [
  { id: 'registered', label: 'Registered product', value: '6154000123451', hint: 'Barcode', outcome: 'Registered' },
  { id: 'registered-nafdac', label: 'Registered, by NAFDAC number', value: 'A7-205331', hint: 'NAFDAC number', outcome: 'Registered' },
  { id: 'insufficient', label: 'Product found, no registration', value: '6154000456788', hint: 'Barcode', outcome: 'Not enough information' },
  { id: 'not-verified', label: 'Not in the records', value: '6154000789015', hint: 'Barcode', outcome: 'Not verified' },
  { id: 'unavailable', label: 'Record unavailable', value: '6154000912345', hint: 'Barcode', outcome: 'Product unavailable' },
  { id: 'invalid', label: 'Mistyped barcode', value: '6154000123450', hint: 'Barcode', outcome: 'Invalid code' },
  { id: 'offline', label: 'Service unreachable', value: '6154000000004', hint: 'Barcode', outcome: 'Connection error' },
];
