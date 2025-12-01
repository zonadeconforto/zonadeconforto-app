import { InvestmentProductService } from '@/modules/investment-product/services/investment-product.service';
import { InvestmentProductRepository } from '@/modules/investment-product/repositories/investment-product.repository';
import { CreateInvestmentProductDTO } from '@/modules/investment-product/dtos/create-investment-product.dto';
import { UpdateInvestmentProductDTO } from '@/modules/investment-product/dtos/update-investment-product.dto';
import { InvestmentProductEntity } from '@/modules/investment-product/entities/investment-product.entity';
import { InvestmentProductMapper } from '@/modules/investment-product/mappers/investment-product.mapper';
import { NotFoundError, ValidationError } from '@/shared/utils/errors';

/**
 * Concrete implementation of InvestmentProductService
 * Contains application rules and validations.
 */
export class InvestmentProductServiceImpl implements InvestmentProductService {
  constructor(private readonly repo: InvestmentProductRepository) {}

  async create(dto: CreateInvestmentProductDTO): Promise<InvestmentProductEntity> {
    if (dto.minValue < 0) throw new ValidationError('minValue must be >= 0');
    if (dto.maxValue < dto.minValue) throw new ValidationError('maxValue must be >= minValue');
    if (dto.profitabilityValue <= 0) throw new ValidationError('profitabilityValue must be > 0');

    const needsIndexer =
      dto.profitabilityType === 'CDI_POST_FIXED' || dto.profitabilityType === 'HYBRID';
    if (needsIndexer && !dto.indexer) {
      throw new ValidationError('indexer is required when profitabilityType is post-fixed or hybrid');
    }

    const model = InvestmentProductMapper.toModel(dto);
    const created = await this.repo.create(model);
    return InvestmentProductMapper.toEntity(created);
  }

  async list(): Promise<InvestmentProductEntity[]> {
    const models = await this.repo.findAll();
    return models.map(m => InvestmentProductMapper.toEntity(m));
  }

  async getById(id: string): Promise<InvestmentProductEntity> {
    const model = await this.repo.findById(id);
    if (!model) throw new NotFoundError('InvestmentProduct not found');
    return InvestmentProductMapper.toEntity(model);
  }

  async update(id: string, dto: UpdateInvestmentProductDTO): Promise<InvestmentProductEntity> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundError('InvestmentProduct not found');

    if (dto.minValue !== undefined && dto.minValue < 0) throw new ValidationError('minValue must be >= 0');
    if (dto.maxValue !== undefined && dto.minValue !== undefined && dto.maxValue < dto.minValue) throw new ValidationError('maxValue must be >= minValue');
    if (dto.profitabilityValue !== undefined && dto.profitabilityValue <= 0) throw new ValidationError('profitabilityValue must be > 0');

    const needsIndexer =
      (dto.profitabilityType ?? existing.profitabilityType) === 'CDI_POST_FIXED' ||
      (dto.profitabilityType ?? existing.profitabilityType) === 'HYBRID';
    if (needsIndexer && (dto.indexer ?? existing.indexer) === undefined) {
      throw new ValidationError('indexer is required when profitabilityType is post-fixed or hybrid');
    }

    const updates = InvestmentProductMapper.toPartialModel(dto);
    const updated = await this.repo.update(id, updates);
    return InvestmentProductMapper.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundError('InvestmentProduct not found');
    await this.repo.delete(id);
  }
}
