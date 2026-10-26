/**
 * Shared data shapes (JSDoc typedefs, no build step required).
 * The future backend should return objects matching VerificationResult so the UI never changes.
 *
 * @typedef {'gtin' | 'nafdac'} IdentifierType
 *
 * @typedef {Object} Identifier
 * @property {IdentifierType} type
 * @property {string} value                Normalised value, e.g. "6154000123451" or "A1-123456"
 *
 * @typedef {Object} Product
 * @property {string} name
 * @property {string} [variant]            e.g. "1 litre bottle"
 * @property {string} [manufacturer]
 * @property {string} [category]
 * @property {string} [gtin]
 * @property {'ochre'|'rose'|'sage'|'sky'} [imageTone]   Demo illustration only
 *
 * @typedef {Object} NafdacRegistration
 * @property {string} number               e.g. "A1-123456"
 * @property {'active'|'expired'|'suspended'|'unknown'} status
 * @property {string} [productType]
 * @property {string} [registeredOn]       ISO date
 * @property {string} [expiresOn]          ISO date
 *
 * @typedef {'registered' | 'insufficient' | 'not_verified'} VerificationStatus
 *
 * @typedef {Object} VerificationResult
 * @property {string} id
 * @property {VerificationStatus} status
 * @property {Identifier} identifier
 * @property {Product | null} product
 * @property {NafdacRegistration | null} nafdac
 * @property {string[]} reasons            Machine codes, e.g. "NO_REGISTRATION_LINK"
 * @property {string} checkedAt            ISO timestamp
 * @property {{ kind: 'demo' | 'live', label: string }} source
 */
export {};
