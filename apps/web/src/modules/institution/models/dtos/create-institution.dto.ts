// biblioteca para validar esses dados
import { z } from "zod";
import { FinancialInstitutionType } from "@/generated/prisma/enums";

export const CreateInstitutionSchema = z.object({
  // não sei se esse é o mínimo correto para nome mas por enquanto deixa assim
  name: z.string().min(3),
  cnpj: z.string().min(14),
  type: z.nativeEnum(FinancialInstitutionType),
  // verifica se a url é válida, e é um campo opicional, pode ser null
  site: z.string().url().optional().nullable(),
});

export type CreateInstitutionDto = z.infer<typeof CreateInstitutionSchema>;
