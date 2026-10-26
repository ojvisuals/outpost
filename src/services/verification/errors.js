/**
 * Error codes the UI knows how to present:
 *  INVALID_INPUT  the code is malformed
 *  NETWORK        the verification service can't be reached
 *  UNAVAILABLE    the identifier exists but no result can be produced
 */
export class VerificationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'VerificationError';
    this.code = code;
  }
}
