import { prisma } from "@/shared/prisma/client";
import { IInstitutionRepository } from "../repositories/institution.repository";
import { ICreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionModel } from "../models/institution.model";
// cria a instituição
export class InstitutionDatasource implements IInstitutionRepository {
  async create(data: ICreateInstitutionDto): Promise<InstitutionModel> {
    const institution = await prisma.financialInstitution.create({
      data,
    });

    return institution;
  }
  // busca o cpnj
  async findByCnpj(cnpj: string): Promise<InstitutionModel | null> {
    return prisma.financialInstitution.findUnique({
      where: { cnpj },
    });
  }
}
