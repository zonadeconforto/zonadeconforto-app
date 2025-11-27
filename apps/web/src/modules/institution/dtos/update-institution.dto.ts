// para se precisar trocar algo, dar update em algo de uma instituição futuramente
import { FinancialInstitutionType } from "@/generated/prisma/enums";

export interface UpdateInstitutionDto {
  name?: string;
  cnpj?: string;
  type?: FinancialInstitutionType;
  site?: string | null;
}
