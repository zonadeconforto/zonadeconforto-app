import { FinancialInstitutionType as PrismaFinancialInstitutionType } from "@/generated/prisma/enums";
import { FinancialInstitutionType as TsFinancialInstitutionType } from "@/modules/institution/enums/institution-type.enum";

export class FinancialInstitutionTypeMapper {
  /**
   * Converte enum do Prisma para enum da aplicação
   */
  static toDomain(type: PrismaFinancialInstitutionType): TsFinancialInstitutionType {
    switch (type) {
      case PrismaFinancialInstitutionType.BANK:
        return TsFinancialInstitutionType.BANK;
      case PrismaFinancialInstitutionType.BROKERAGE:
        return TsFinancialInstitutionType.BROKER;
      default:
        throw new Error(`Prisma enum not mapped: ${type}`);
    }
  }

  /**
   * Converte enum da aplicação para enum do Prisma
   */
  static toPrisma(type: TsFinancialInstitutionType): PrismaFinancialInstitutionType {
    switch (type) {
      case TsFinancialInstitutionType.BANK:
        return PrismaFinancialInstitutionType.BANK;
      case TsFinancialInstitutionType.BROKER:
        return PrismaFinancialInstitutionType.BROKERAGE;
      default:
        throw new Error(`Domain enum not mapped: ${type}`);
    }
  }
}
