import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionModel } from "../models/institution.model";

export interface InstitutionRepository {
  create(data: CreateInstitutionDto): Promise<InstitutionModel>;
  findByCnpj(cnpj: string): Promise<InstitutionModel | null>;
  // catch all
  findAll(): Promise<InstitutionModel[]>;
}
