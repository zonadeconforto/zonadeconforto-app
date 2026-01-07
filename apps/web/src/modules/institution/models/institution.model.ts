import { FinancialInstitutionType } from "@prisma/client";

export interface InstitutionModel {
  id: string;
  name: string;
  cnpj: string;
  type: FinancialInstitutionType;
  site?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
