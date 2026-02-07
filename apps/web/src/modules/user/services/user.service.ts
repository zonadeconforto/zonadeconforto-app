import { Role } from "../enums/role.enum";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDTO } from "../dtos/update-user.dto";

/**
 * Handles the business logic for user operations.
 *
 * This interface defines the contract that all
 * user service implementations must follow.
 */
export interface UserService {
  update(id: string, data: UpdateUserDTO): Promise<UserEntity>;
  /**
   * Creates a new user.
   * Ensures email uniqueness and hashes the password.
   */
  createUser(
    name: string,
    email: string,
    password: string,
    role: Role,
    phone?: string,
    cpf?: string
  ): Promise<string>;

  /**
   * Retrieves a user by its unique identifier.
   *
   * Used for authenticated profile access.
   *
   * @param id - User unique identifier
   * @returns UserEntity if found
   * @throws HttpException if user does not exist
   */
  findById(id: string): Promise<UserEntity>;
  listAll(): Promise<UserEntity[]>;
}
