import { InvestmentProductModel } from '@/modules/investment-product/models/investment-product.model';

/**
 * Repository interface defining data operations for InvestmentProduct.
 */
export interface InvestmentProductRepository {
  create(payload: InvestmentProductModel): Promise<InvestmentProductModel>;
  findById(id: string): Promise<InvestmentProductModel | null>;
  findAll(): Promise<InvestmentProductModel[]>;
  update(id: string, updates: Partial<InvestmentProductModel>): Promise<InvestmentProductModel>;
  delete(id: string): Promise<void>;
}
