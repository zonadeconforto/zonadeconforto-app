import { orm } from "@/shared/prisma/client";
import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionModel } from "../models/institution.model";
import { FinancialInstitutionTypeMapper } from "../mappers/financial-institution-enum.mapper";
import { InstitutionRepository } from "../repositories/institution.repository";
import { UpdateInstitutionDto } from "../dtos/update-institution.dto";

export class InstitutionDatasource implements InstitutionRepository {
  async create(data: CreateInstitutionDto): Promise<InstitutionModel> {
    const institution = await orm.financialInstitution.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        site: data.site,
        type: FinancialInstitutionTypeMapper.toPrisma(data.type),
      },
    });

    return institution;
  }

  async findByCnpj(cnpj: string): Promise<InstitutionModel | null> {
    return await orm.financialInstitution.findUnique({
      where: { cnpj },
    });
  }

  async findAll(): Promise<InstitutionModel[]> {
    return await orm.financialInstitution.findMany({
      // order by descending order
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(id: string): Promise<void> {
    await orm.financialInstitution.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<InstitutionModel | null> {
    return await orm.financialInstitution.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateInstitutionDto): Promise<InstitutionModel> {
    return await orm.financialInstitution.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        cnpj: data.cnpj ?? undefined,
        type: data.type ? FinancialInstitutionTypeMapper.toPrisma(data.type) : undefined,
        site: data.site !== undefined ? data.site : undefined,
      },
    });
  }
}
