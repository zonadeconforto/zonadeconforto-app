/**
 * Domain entity representing an Investment Product.
 * No direct framework dependencies.
 */
export type InvestmentProductProps = {
  id?: string;
  name: string;
  productType: string;
  financialInstitutionId: string;
  profitabilityType: string;
  profitabilityValue: number;
  indexer?: string | null;
  termMonths: number;
  liquidity: string;
  graceDays?: number | null;
  minValue: number;
  maxValue: number;
  startOfferDate?: Date | null;
  endOfferDate?: Date | null;
  adminFee?: number;
  incomeTax: string;
  description?: string | null;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  site?: string;
};

export class InvestmentProductEntity {
  readonly id?: string;
  readonly name: string;
  readonly productType: string;
  readonly financialInstitutionId: string;
  readonly profitabilityType: string;
  readonly profitabilityValue: number;
  readonly indexer?: string | null;
  readonly termMonths: number;
  readonly liquidity: string;
  readonly graceDays?: number | null;
  readonly minValue: number;
  readonly maxValue: number;
  readonly startOfferDate?: Date | null;
  readonly endOfferDate?: Date | null;
  readonly adminFee?: number;
  readonly incomeTax: string;
  readonly description?: string | null;
  readonly status?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly site?: string;
  /**
   * Entity constructor
   */
  constructor(props: InvestmentProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.productType = props.productType;
    this.financialInstitutionId = props.financialInstitutionId;
    this.profitabilityType = props.profitabilityType;
    this.profitabilityValue = props.profitabilityValue;
    this.indexer = props.indexer ?? null;
    this.termMonths = props.termMonths;
    this.liquidity = props.liquidity;
    this.graceDays = props.graceDays ?? null;
    this.minValue = props.minValue;
    this.maxValue = props.maxValue;
    this.startOfferDate = props.startOfferDate ?? null;
    this.endOfferDate = props.endOfferDate ?? null;
    this.adminFee = props.adminFee ?? 0;
    this.incomeTax = props.incomeTax;
    this.description = props.description ?? null;
    this.status = props.status ?? "ACTIVE";
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.site = props.site;
  }
}
