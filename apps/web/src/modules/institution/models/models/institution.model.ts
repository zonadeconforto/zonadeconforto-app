import { FinancialInstitutionType } from "@/generated/prisma/enums";

export interface InstitutionModel {
  id: string;
  name: string;
  cnpj: string;
  type: FinancialInstitutionType;
  site?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
