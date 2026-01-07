import { InvestmentProductCreateModel } from "../models/create-investment-product.model";
import { InvestmentProductModel } from "../models/investment-product.model";

/**
 * Repository interface defining data operations for InvestmentProduct.
 */
export interface InvestmentProductRepository {
  create(payload: InvestmentProductCreateModel): Promise<InvestmentProductModel>;
  findById(id: string): Promise<InvestmentProductModel | null>;
  findAll(): Promise<InvestmentProductModel[]>;
  update(id: string, updates: Partial<InvestmentProductModel>): Promise<InvestmentProductModel>;
  delete(id: string): Promise<void>;
}
