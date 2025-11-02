import jwt from "jsonwebtoken";
import { TokenService } from "./token.service";

/**
 * JWT-based implementation of the TokenService interface.
 */
export class TokenJwtService implements TokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn = "7d") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
}
