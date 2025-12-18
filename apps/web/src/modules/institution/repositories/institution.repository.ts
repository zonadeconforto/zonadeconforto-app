import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { UpdateInstitutionDto } from "../dtos/update-institution.dto";
import { InstitutionModel } from "../models/institution.model";

export interface InstitutionRepository {
  create(data: CreateInstitutionDto): Promise<InstitutionModel>;
  findByCnpj(cnpj: string): Promise<InstitutionModel | null>;
  findById(id: string): Promise<InstitutionModel | null>;
  findAll(): Promise<InstitutionModel[]>;
  update(id: string, data: UpdateInstitutionDto): Promise<InstitutionModel>;
  delete(id: string): Promise<void>;
}
