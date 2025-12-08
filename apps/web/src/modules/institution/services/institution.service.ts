import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InstitutionOutputDto } from "../dtos/institution-output.dto";

/**
 * Handles the business logic for institution operations.
 */
export interface InstitutionService {
  createInstitution(createInstitutionDto: CreateInstitutionDto): Promise<string>;
  findAllInstitutions(): Promise<InstitutionOutputDto[]>;
  deleteInstitution(id: string): Promise<void>;
}
