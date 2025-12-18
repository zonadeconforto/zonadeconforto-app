import { orm } from "@/shared/prisma/client";
import { InvestmentProductRepository } from "@/modules/investment-product/repositories/investment-product.repository";
import { InvestmentProductModel } from "@/modules/investment-product/models/investment-product.model";
import { InvestmentProductCreateModel } from "@/modules/investment-product/models/create-investment-product.model";
import { InvestmentProductUpdateModel } from "@/modules/investment-product/models/update-investment-product.model";
import { InvestmentProductMapper } from "@/modules/investment-product/mappers/investment-product.mapper";

/**
 * Prisma-based datasource implementing InvestmentProductRepository.
 * ZERO ANY. Fully typed.
 */
export class InvestmentProductPrismaDatasource
  implements InvestmentProductRepository
{
  async create(
    payload: InvestmentProductCreateModel
  ): Promise<InvestmentProductModel> {
    const created = await orm.investmentProduct.create({
      data: payload,
    });

    return InvestmentProductMapper.toModel(created);
  }

  async findById(id: string): Promise<InvestmentProductModel | null> {
    const found = await orm.investmentProduct.findUnique({
      where: { id },
    });

    return found ? InvestmentProductMapper.toModel(found) : null;
  }

  async findAll(): Promise<InvestmentProductModel[]> {
    const list = await orm.investmentProduct.findMany({
      orderBy: { createdAt: "desc" },
    });

    return list.map((item) => InvestmentProductMapper.toModel(item));
  }

  async update(
    id: string,
    updates: InvestmentProductUpdateModel
  ): Promise<InvestmentProductModel> {
    const updated = await orm.investmentProduct.update({
      where: { id },
      data: updates, // agora tipado corretamente
    });

    return InvestmentProductMapper.toModel(updated);
  }

  async delete(id: string): Promise<void> {
    await orm.investmentProduct.delete({
      where: { id },
    });
  }
}
