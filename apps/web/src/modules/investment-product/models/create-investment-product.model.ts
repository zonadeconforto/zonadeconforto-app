import {
  IncomeTaxType,
  IndexerType,
  InvestmentProductStatus,
  LiquidityType,
  ProductType,
  ProfitabilityType,
} from "@/generated/prisma/enums";

/**
 * Persistence model interface that matches Prisma model shape.
 */
export interface InvestmentProductCreateModel {
  name: string;
  productType: ProductType;
  financialInstitutionId: string;
  profitabilityType: ProfitabilityType;
  profitabilityValue: number;
  indexer: IndexerType | null;
  termMonths: number;
  liquidity: LiquidityType;
  graceDays: number | null;
  minValue: number;
  maxValue: number;
  startOfferDate: Date | null;
  endOfferDate: Date | null;
  adminFee: number;
  incomeTax: IncomeTaxType;
  description: string | null;
  status: InvestmentProductStatus;
}
