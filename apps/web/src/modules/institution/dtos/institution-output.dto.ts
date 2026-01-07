// saídas
import { FinancialInstitutionType } from "@prisma/enums";

export interface InstitutionOutputDto {
  id: string;
  name: string;
  cnpj: string;
  type: FinancialInstitutionType;
  site?: string | null;
}
