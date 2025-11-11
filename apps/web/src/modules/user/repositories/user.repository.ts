import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  create(usuario: UserEntity): Promise<string>;
  findByEmail(email: string): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
}
