import { CreateInvestmentProductDTO } from "@/modules/investment-product/dtos/create-investment-product.dto";
import { UpdateInvestmentProductDTO } from "@/modules/investment-product/dtos/update-investment-product.dto";
import { OutputInvestmentProductDTO } from "@/modules/investment-product/dtos/output-investment-product.dto";
import { InvestmentProductService } from "@/modules/investment-product/services/investment-product.service";

/**
 * Controller for InvestmentProduct HTTP handling.
 * Business logic must NOT be here — only validation and orchestration.
 */
export class InvestmentProductController {
  constructor(private readonly service: InvestmentProductService) {}

  async create(payload: unknown): Promise<OutputInvestmentProductDTO> {
    const dto = CreateInvestmentProductDTO.parse(payload);
    const entity = await this.service.create(dto);
    return OutputInvestmentProductDTO.parse(entity);
  }

  async list(): Promise<OutputInvestmentProductDTO[]> {
    const entities = await this.service.list();
    return entities.map((e) => OutputInvestmentProductDTO.parse(e));
  }

  async getById(id: string): Promise<OutputInvestmentProductDTO> {
    const entity = await this.service.getById(id);
    return OutputInvestmentProductDTO.parse(entity);
  }

  async update(
    id: string,
    payload: unknown
  ): Promise<OutputInvestmentProductDTO> {
    const dto = UpdateInvestmentProductDTO.parse(payload);
    const updated = await this.service.update(id, dto);
    return OutputInvestmentProductDTO.parse(updated);
  }

  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }
}
