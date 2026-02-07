import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../models/user.model";
import { RoleEnumMapper } from "./role-enum.mapper";

/**
 * Responsible for mapping between Prisma model and domain entity.
 */
export class UserMapper {
  static toEntity(model: UserModel): UserEntity {
    return new UserEntity(
      model.id,
      model.name,
      model.email,
      model.passwordHash,
      model.phone,
      model.cpf,
      RoleEnumMapper.fromORM(model.role),
      model.createdAt,
      model.updatedAt
    );
  }

  static toPersistence(entity: UserEntity): Partial<UserModel> {
    return {
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      role: RoleEnumMapper.toORM(entity.role),
    };
  }
}
