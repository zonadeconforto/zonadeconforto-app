import { CreateInstitutionDto } from "../dtos/create-institution.dto";

/**
 * Handles the business logic for institution operations.
 */
export interface InstitutionService {
  /**
   * Creates a new institution.
   */
  createInstitution(createInstitutionDto: CreateInstitutionDto): Promise<string>;
}
