import { Role as DomainRole } from "../enums/role.enum";
import { Role as PrismaRole } from "@/generated/prisma/enums";

export class RoleEnumMapper {
    static fromORM(role: PrismaRole): DomainRole {
    switch (role) {
      case PrismaRole.ADMIN:
        return DomainRole.ADMIN;
      case PrismaRole.CLIENT:
        return DomainRole.CLIENT;
      default:
        throw new Error(`Unknown role from Prisma: ${role}`);
    }
  }

  static toORM(role: DomainRole): PrismaRole {
    switch (role) {
      case DomainRole.ADMIN:
        return PrismaRole.ADMIN;
      case DomainRole.CLIENT:
        return PrismaRole.CLIENT;
      default:
        throw new Error(`Unknown domain role: ${role}`);
    }
  }
}