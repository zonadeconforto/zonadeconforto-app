import { UpdateUserDTO } from "../dtos/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  create(usuario: UserEntity): Promise<string>;
  findByEmail(email: string): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, data: UpdateUserDTO): Promise<UserEntity> | null;
}
