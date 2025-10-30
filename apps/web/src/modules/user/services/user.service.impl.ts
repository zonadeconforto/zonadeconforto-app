// src/modules/user/services/user.service.ts

import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { hash } from "bcryptjs";
import { Role } from "../enums/role.enum";
import { UserService } from "./user.service";
import { HttpException } from "@/app/api/core/exceptions/http-exception";

/**
 * Handles the business logic for user operations.
 */
export class UserServiceImpl implements UserService {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Creates a new user.
   * Ensures email uniqueness and hashes the password.
   */
  async createUser(
    name: string,
    email: string,
    password: string,
    role: Role = Role.CLIENT,
  ): Promise<string> {
    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new HttpException("User already exists with this email.");
    }

    const hashedPassword = await hash(password, 12);
    const entity = UserEntity.build(name, email, hashedPassword, role);
    return await this.repository.create(entity);
  }
}
