import { CreateInvestmentProductDTO } from '@/modules/investment-product/dtos/create-investment-product.dto';
import { UpdateInvestmentProductDTO } from '@/modules/investment-product/dtos/update-investment-product.dto';
import { InvestmentProductEntity } from '@/modules/investment-product/entities/investment-product.entity';

/**
 * Service interface for InvestmentProduct business rules.
 */
export interface InvestmentProductService {
  create(dto: CreateInvestmentProductDTO): Promise<InvestmentProductEntity>;
  list(): Promise<InvestmentProductEntity[]>;
  getById(id: string): Promise<InvestmentProductEntity>;
  update(id: string, dto: UpdateInvestmentProductDTO): Promise<InvestmentProductEntity>;
  delete(id: string): Promise<void>;
}
