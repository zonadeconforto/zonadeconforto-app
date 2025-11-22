// data transferer object = objeto de trânsferência de dados, intermediador
// biblioteca para validar esses dados
import { z } from "zod";
import { FinancialInstitutionType } from "@/generated/prisma/enums";

export const CreateInstitutionDto = z.object({
  // não sei se é melhor colocar esse como o mínimo
  name: z.string().min(3),
  cnpj: z.string().min(14),
  type: z.nativeEnum(FinancialInstitutionType),
  // verifica se a url é válida, e é um campo opicional, pode ser null
  site: z.string().url().optional().nullable(),
});

export type ICreateInstitutionDto = z.infer<typeof CreateInstitutionDto>;
