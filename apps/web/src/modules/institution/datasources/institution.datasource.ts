import { prisma } from "@/shared/prisma/client";
import { InstitutionRepository } from "../repositories/institution.repository";
import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionModel } from "../models/institution.model";
export class InstitutionDatasource implements InstitutionRepository {
  async create(data: CreateInstitutionDto): Promise<InstitutionModel> {
    const institution = await prisma.financialInstitution.create({
      data,
    });

    return institution;
  }

  async findByCnpj(cnpj: string): Promise<InstitutionModel | null> {
    return prisma.financialInstitution.findUnique({
      where: { cnpj },
    });
  }
}
