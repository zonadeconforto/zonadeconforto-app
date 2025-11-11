import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";
import { TokenService } from "./token.service";
import { type StringValue } from "ms";

/**
 * JWT-based implementation of the TokenService interface.
 */
export class TokenJwtService implements TokenService {
  private readonly secret: Secret;
  private readonly expiresIn: string | number;

  constructor(secret: string, expiresIn: string | number = "7d") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    const options: SignOptions = { expiresIn: this.expiresIn as StringValue };
    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): string | JwtPayload {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
}
