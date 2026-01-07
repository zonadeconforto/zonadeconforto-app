import {
  IncomeTaxType,
  IndexerType,
  InvestmentProductStatus,
  LiquidityType,
  ProductType,
  ProfitabilityType,
} from "@prisma/enums";

/**
 * Persistence model interface that matches Prisma model shape.
 * Fields that are DB-generated (like id, createdAt) are optional for create payloads.
 */
export interface InvestmentProductModel {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
