import { InvestmentProductEntity } from "@/modules/investment-product/entities/investment-product.entity";
import { InvestmentProductModel } from "@/modules/investment-product/models/investment-product.model";
import { CreateInvestmentProductDTO } from "@/modules/investment-product/dtos/create-investment-product.dto";
import { UpdateInvestmentProductDTO } from "@/modules/investment-product/dtos/update-investment-product.dto";
import { InvestmentProductUpdateModel } from "@/modules/investment-product/models/update-investment-product.model";
import { InvestmentProductCreateModel } from "@/modules/investment-product/models/create-investment-product.model";
import { InvestmentProduct } from "@prisma/client";

/**
 * Mapper between DTOs, Domain Entities and Persistence Models.
 * 100% NO ANY.
 */
export class InvestmentProductMapper {
  /**
   * Prisma → Model
   */
  static toModel(prisma: InvestmentProduct & { financialInstitution? : { site: string | null } }): InvestmentProductModel {
    return {
      id: prisma.id,
      name: prisma.name,
      productType: prisma.productType,
      financialInstitutionId: prisma.financialInstitutionId,
      profitabilityType: prisma.profitabilityType,
      profitabilityValue: Number(prisma.profitabilityValue),
      indexer: prisma.indexer,
      termMonths: prisma.termMonths,
      liquidity: prisma.liquidity,
      graceDays: prisma.graceDays,
      minValue: Number(prisma.minValue),
      maxValue: Number(prisma.maxValue),
      startOfferDate: prisma.startOfferDate,
      endOfferDate: prisma.endOfferDate,
      adminFee: Number(prisma.adminFee),
      incomeTax: prisma.incomeTax,
      description: prisma.description,
      status: prisma.status,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      site: prisma.financialInstitution?.site ?? null,
    };
  }

  /**
   * Create DTO → Model
   */
  static toCreateModel(dto: CreateInvestmentProductDTO): InvestmentProductCreateModel {
    return {
      name: dto.name,
      productType: dto.productType,
      financialInstitutionId: dto.financialInstitutionId,
      profitabilityType: dto.profitabilityType,
      profitabilityValue: dto.profitabilityValue,
      indexer: dto.indexer ?? null,
      termMonths: dto.termMonths,
      liquidity: dto.liquidity,
      graceDays: dto.graceDays ?? null,
      minValue: dto.minValue,
      maxValue: dto.maxValue,
      startOfferDate: dto.startOfferDate ?? null,
      endOfferDate: dto.endOfferDate ?? null,
      adminFee: dto.adminFee ?? 0,
      incomeTax: dto.incomeTax,
      description: dto.description ?? null,
      status: dto.status ?? "ACTIVE",
    };
  }

  /**
   * Update DTO → UpdateModel
   */
  static toUpdateModel(dto: UpdateInvestmentProductDTO): InvestmentProductUpdateModel {
    return { ...dto };
  }

  /**
   * Model → Entity
   */
  static toEntity(model: InvestmentProductModel): InvestmentProductEntity {
    return new InvestmentProductEntity(model);
  }
}
