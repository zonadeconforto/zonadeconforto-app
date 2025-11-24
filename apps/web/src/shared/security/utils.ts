import { genSalt } from "bcryptjs";
export class SecurityService {
  static async getSalt() {
    return await genSalt(Number(process.env.BCRYPT_SALT_ROUNDS || "12"));
  }
}
