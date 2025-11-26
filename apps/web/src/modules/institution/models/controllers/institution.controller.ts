import { InstitutionService } from "../services/institution.service";
import { CreateInstitutionDto } from "../dtos/create-institution.dto";

export class InstitutionController {
  constructor(private readonly service: InstitutionService) {}

  async create(data: CreateInstitutionDto): Promise<string> {
    return await this.service.createInstitution(data);
  }
}
