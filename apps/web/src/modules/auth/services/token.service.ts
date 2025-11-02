/**
 * Abstraction for token generation and validation.
 */
export interface TokenService {
  /**
   * Generates an access token for the given payload.
   * @param payload Arbitrary data to encode in the token.
   */
  generateToken(payload: object): string;

  /**
   * Validates and decodes a token.
   * @param token Token to verify.
   */
  verifyToken(token: string): any;
}
