import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { UpdateInstitutionDto } from "../dtos/update-institution.dto";
import { InstitutionService } from "../services/institution.service";

export class InstitutionController {
  constructor(private readonly service: InstitutionService) {}

  async create(data: CreateInstitutionDto): Promise<string> {
    return await this.service.createInstitution(data);
  }

  async findAll() {
    return await this.service.findAllInstitutions();
  }

  async delete(id: string) {
    return await this.service.deleteInstitution(id);
  }

  async update(id: string, data: UpdateInstitutionDto) {
    return await this.service.updateInstitution(id, data);
  }
}
