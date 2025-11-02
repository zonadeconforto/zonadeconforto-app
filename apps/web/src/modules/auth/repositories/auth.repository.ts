import { UserEntity } from "@/modules/user/entities/user.entity";

/**
 * Abstraction layer for authentication data access.
 */
export interface AuthRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
}
