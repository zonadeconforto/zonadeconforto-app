export class SecurityService {
    static readonly BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 12;
}
