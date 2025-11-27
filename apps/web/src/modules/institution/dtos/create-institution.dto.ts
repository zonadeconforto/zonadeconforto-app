import { z } from "zod";
import { FinancialInstitutionType } from "../enums/institution-type.enum";

export const CreateInstitutionSchema = z.object({
  name: z.string().min(3).max(120),
  cnpj: z.string().length(14),
  type: z.enum(FinancialInstitutionType),
  site: z.url().optional().nullable(),
});

export type CreateInstitutionDto = z.infer<typeof CreateInstitutionSchema>;
