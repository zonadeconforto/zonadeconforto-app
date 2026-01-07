import { Role } from "@prisma/enums";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date | null;
}
