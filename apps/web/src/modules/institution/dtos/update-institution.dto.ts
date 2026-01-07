import { z } from "zod";
import { FinancialInstitutionType } from "../enums/institution-type.enum";

/**
 * Zod schema for updating an institution
 * All fields are optional except `id`, which is required
 */
export const UpdateInstitutionSchema = z.object({
  name: z.string().optional(),
  cnpj: z.string().optional(),
  type: z.enum(FinancialInstitutionType).optional(),
  site: z.string().nullable().optional(),
});

/**
 * TypeScript DTO for Institution Update
 */
export type UpdateInstitutionDto = z.infer<typeof UpdateInstitutionSchema>;
