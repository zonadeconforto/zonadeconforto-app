import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionOutputDto } from "../dtos/institution-output.dto";
import { UpdateInstitutionDto } from "../dtos/update-institution.dto";
import { InstitutionModel } from "../models/institution.model";

/**
 * Handles the business logic for institution operations.
 */

export interface InstitutionService {
  createInstitution(data: CreateInstitutionDto): Promise<string>;
  findAllInstitutions(): Promise<InstitutionOutputDto[]>;
  findByCnpj(cnpj: string): Promise<InstitutionModel | null>;
  findAll(): Promise<InstitutionModel[]>;
  findById(id: string): Promise<InstitutionModel | null>;
  deleteInstitution(id: string): Promise<void>;
  updateInstitution(id: string, data: UpdateInstitutionDto): Promise<InstitutionOutputDto>;
}
