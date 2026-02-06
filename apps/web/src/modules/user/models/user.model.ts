import { Role } from "@prisma/client";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  cpf: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date | null;
}
