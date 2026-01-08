import { genSalt } from "bcryptjs";
export class SecurityService {
  static async getSalt(): Promise<string> {
    return await genSalt(Number(process.env.BCRYPT_SALT_ROUNDS || "12"));
  }
  static getJwtSecret(): Uint8Array<ArrayBuffer> {
    return new TextEncoder().encode(process.env.JWT_SECRET || "changeme");
  }
}
