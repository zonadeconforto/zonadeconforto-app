import { InstitutionModel } from "../models/institution.model.ts";
import { ICreateInstitutionDto } from "../dtos/create-institution.dto.ts";

export interface IInstitutionRepository {
  create(data: ICreateInstitutionDto): Promise<InstitutionModel>;
  findByCnpj(cnpj: string): Promise<InstitutionModel | null>;
}
