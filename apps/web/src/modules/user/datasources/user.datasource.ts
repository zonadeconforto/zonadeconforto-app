import { orm } from "@/shared/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UpdateUserDTO } from "../dtos/update-user.dto";

export class UserDatasource implements UserRepository {
  async update(id: string, data: UpdateUserDTO): Promise<UserEntity | null> {
    const updated = await orm.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
        ...(data.cpf && { cpf: data.cpf }),
      },
    });

    if (!updated) return null;

    return UserMapper.toEntity(updated);
  }

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

  async findById(id: string): Promise<UserEntity | null> {
    const user = await orm.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }
}
