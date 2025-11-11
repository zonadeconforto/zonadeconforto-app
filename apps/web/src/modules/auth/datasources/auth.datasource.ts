import { orm } from "@/shared/prisma/client";
import { AuthRepository } from "../repositories/auth.repository";
import { UserMapper } from "@/modules/user/mappers/user.mapper";
import { UserEntity } from "@/modules/user/entities/user.entity";

/**
 * Prisma-based implementation of AuthRepository.
 */
export class AuthDatasource implements AuthRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await orm.user.findUnique({ where: { email } });
    return user ? UserMapper.toEntity(user) : null;
  }
}
