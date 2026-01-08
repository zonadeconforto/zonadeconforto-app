import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { TokenService } from "./token.service";

/**
 * JWT-based implementation of the TokenService interface using JOSE.
 * Compatible with Edge Runtime and Node.js.
 */
export class TokenJwtService implements TokenService {
  private readonly secret: Uint8Array;
  private readonly expiresIn: string;

  constructor(secret: Uint8Array, expiresIn: string = "7d") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  async generateToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(this.expiresIn)
      .sign(this.secret);
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return payload;
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
}
