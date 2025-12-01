import { orm } from "@/shared/prisma/client";
import { InstitutionRepository } from "../repositories/institution.repository";
import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionModel } from "../models/institution.model";
import { FinancialInstitutionTypeMapper } from "../mappers/financial-institution-enum.mapper";

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
    return orm.financialInstitution.findUnique({
      where: { cnpj },
    });
  }

  async findAll(): Promise<InstitutionModel[]> {
    return orm.financialInstitution.findMany({
      // order by descending order
      orderBy: { createdAt: "desc" },
    });
  }
}
