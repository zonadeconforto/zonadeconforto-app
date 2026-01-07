import { FinancialInstitutionType } from "@/generated/prisma/enums";

export class InstitutionEntity {
  id!: string;
  name!: string;
  cnpj!: string;
  type!: FinancialInstitutionType;
  site?: string | null;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(props: Partial<InstitutionEntity>) {
    Object.assign(this, props);
  }
}
