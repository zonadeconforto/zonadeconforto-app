import { z } from "zod";

export const OutputInvestmentProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  productType: z.string(),
  financialInstitutionId: z.string().uuid(),
  profitabilityType: z.string(),
  profitabilityValue: z.number(),
  indexer: z.string().nullable(),
  termMonths: z.number(),
  liquidity: z.string(),
  graceDays: z.number().nullable(),
  minValue: z.number(),
  maxValue: z.number(),
  startOfferDate: z.string().nullable(),
  endOfferDate: z.string().nullable(),
  adminFee: z.number().optional(),
  incomeTax: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export type OutputInvestmentProductDTO = z.infer<
  typeof OutputInvestmentProductSchema
>;
export const OutputInvestmentProductDTO = OutputInvestmentProductSchema;
