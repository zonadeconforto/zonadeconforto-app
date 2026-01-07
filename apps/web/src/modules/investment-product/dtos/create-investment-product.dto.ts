import { z } from "zod";

/**
 * Zod schema and typed DTO for creating InvestmentProduct
 */
export const CreateInvestmentProductSchema = z.object({
  name: z.string().min(1).max(100),
  productType: z.enum(["CDB", "LCI", "LCA", "DEBENTURE", "OTHER"]),
  financialInstitutionId: z.uuid(),
  profitabilityType: z.enum(["PREFIXED", "CDI_POST_FIXED", "IPCA_PLUS", "HYBRID"]),
  profitabilityValue: z.number().positive(),
  indexer: z.enum(["CDI", "IPCA", "SELIC"]).optional(),
  termMonths: z.number().int().min(1),
  liquidity: z.enum(["DAILY", "MATURITY", "GRACE_PERIOD"]),
  graceDays: z.number().int().min(0).optional().nullable(),
  minValue: z.number().nonnegative(),
  maxValue: z.number().nonnegative(),
  startOfferDate: z
    .string()
    .optional()
    .nullable()
    .transform(s => (s ? new Date(s) : null)),
  endOfferDate: z
    .string()
    .optional()
    .nullable()
    .transform(s => (s ? new Date(s) : null)),
  adminFee: z.number().nonnegative().optional().default(0),
  incomeTax: z.enum(["REGRESSIVE", "EXEMPT", "EXCLUSIVE"]),
  description: z.string().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMING_SOON", "EXPIRED"]).optional().default("ACTIVE"),
});

export type CreateInvestmentProductDTO = z.infer<typeof CreateInvestmentProductSchema>;
export const CreateInvestmentProductDTO = CreateInvestmentProductSchema;
