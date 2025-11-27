import { InstitutionRepository } from "../repositories/institution.repository.js";
import { CreateInstitutionDto, CreateInstitutionSchema } from "../dtos/create-institution.dto.js";
import { InstitutionMapper } from "../mappers/institution.mapper.js";
import { InstitutionService } from "./institution.service.js";

export class InstitutionServiceImpl implements InstitutionService {
  constructor(private readonly repository: InstitutionRepository) {}

  async createInstitution(createInstitutionDto: CreateInstitutionDto): Promise<string> {
    const validated = CreateInstitutionSchema.parse(createInstitutionDto);

    const exists = await this.repository.findByCnpj(validated.cnpj);
    if (exists) {
      throw new Error("Institution with this CNPJ already exists");
    }

    const created = await this.repository.create(validated);
    const entity = InstitutionMapper.toEntity(created);

    return entity.id;
  }
}
