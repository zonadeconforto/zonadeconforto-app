import { orm } from "@/shared/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasource implements UserRepository {
  async create(user: UserEntity): Promise<string> {
    const created = await orm.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
      },
    });
    return created.id;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await orm.user.findUnique({ where: { email } });
    return found ? UserMapper.toEntity(found) : null;
  }

  async list(): Promise<UserEntity[]> {
    const all = await orm.user.findMany();
    return all.map(UserMapper.toEntity);
  }
}
