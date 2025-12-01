import { FinancialInstitutionType as PrismaFinancialInstitutionType } from "@/generated/prisma/enums";
import { FinancialInstitutionType as TsFinancialInstitutionType } from "@/modules/institution/enums/institution-type.enum";

export class FinancialInstitutionTypeMapper {
  /**
   * convert enum of prisma into enum of aplication
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
   * convert enum of aplication into enum of prisma
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
