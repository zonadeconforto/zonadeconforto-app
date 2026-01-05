import { OutputInvestmentProductDTO } from "@/modules/investment-product/dtos/output-investment-product.dto";

/**
 * View model used by the CDB list screen.
 * Focused on UI needs only.
 */
export interface Cdb {
  id: string;
  name: string;
  profitabilityValue: number;
  termMonths: number;
  liquidity: string;
  minValue: number;
  maxValue: number;
}

export function investmentProductToUi(product: OutputInvestmentProductDTO): Cdb {
  return {
    id: product.id,
    name: product.name,
    profitabilityValue: product.profitabilityValue,
    termMonths: product.termMonths,
    liquidity: product.liquidity === "MATURITY" ? "No vencimento" : "Liquidez diária",
    minValue: product.minValue,
    maxValue: product.maxValue,
  };
}
