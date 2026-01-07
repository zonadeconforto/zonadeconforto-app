// saídas
import { FinancialInstitutionType } from "@prisma/client";

export interface InstitutionOutputDto {
  id: string;
  name: string;
  cnpj: string;
  type: FinancialInstitutionType;
  site?: string | null;
}
