import { Role } from "../enums/role.enum";

/**
 * Handles the business logic for user operations.
 */
export interface UserService {
  /**
   * Creates a new user.
   * Ensures email uniqueness and hashes the password.
   */
  createUser(
    name: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<string>;
}
