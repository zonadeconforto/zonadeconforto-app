import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { hash } from "bcryptjs";
import { Role } from "../enums/role.enum";
import { UserService } from "./user.service";
import { HttpException } from "@/app/core/exceptions/http-exception";
import { SecurityService } from "@/shared/security/utils";
import { UpdateUserDTO } from "../dtos/update-user.dto";

/**
 * Handles the business logic for user operations.
 */
export class UserServiceImpl implements UserService {
  constructor(private readonly repository: UserRepository) {}
  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const updated = await this.repository.update(id, data);

    if (!updated) {
      throw new HttpException("User not found", 404);
    }

    return updated;
  }

  /**
   * Creates a new user.
   *
   * Ensures email uniqueness and hashes the password
   * before persisting the user.
   */
  async createUser(
    name: string,
    email: string,
    password: string,
    role: Role = Role.CLIENT,
    phone?: string,
    cpf?: string
  ): Promise<string> {
    const existing = await this.repository.findByEmail(email);

    if (existing) {
      throw new HttpException("User already exists with this email.", 409);
    }

    const salt = await SecurityService.getSalt();
    const hashedPassword = await hash(password, salt);

    const entity = UserEntity.build(name, email, hashedPassword, role, phone ?? null, cpf ?? null);

    return await this.repository.create(entity);
  }

  /**
   * Retrieves a user by its unique identifier.
   *
   * Used mainly for profile and authentication flows.
   *
   * @param id - User unique identifier
   * @returns UserEntity
   * @throws HttpException if user is not found
   */
  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new HttpException("User not found.", 404);
    }

    return user;
  }
  async listAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }
}
