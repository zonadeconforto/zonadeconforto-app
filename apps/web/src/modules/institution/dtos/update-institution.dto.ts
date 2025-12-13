import { z } from "zod";
import { CreateInstitutionSchema } from "./create-institution.dto";

/**
 * Zod schema for updating an institution
 * All fields are optional except `id`, which is required
 */
export const UpdateInstitutionSchema = z.object({
  name: z.string().optional(),
  cnpj: z.string().optional(),
  type: z.enum(["BANK", "PAYMENT", "OTHER"]).optional(),
  site: z.string().nullable().optional(),
});

/**
 * TypeScript DTO for Institution Update
 */
export type UpdateInstitutionDto = z.infer<typeof UpdateInstitutionSchema>;
