import { z } from "zod";
import { CreateInvestmentProductSchema as _CreateSchema } from "./create-investment-product.dto";

/**
 * Zod schema and typed DTO for updating InvestmentProduct
 * All fields optional (partial update)
 */
export const UpdateInvestmentProductSchema = _CreateSchema.partial();
export type UpdateInvestmentProductDTO = z.infer<
  typeof UpdateInvestmentProductSchema
>;
export const UpdateInvestmentProductDTO = UpdateInvestmentProductSchema;
