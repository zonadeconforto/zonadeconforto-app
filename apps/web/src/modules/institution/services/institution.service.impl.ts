import { InstitutionRepository } from "../repositories/institution.repository";
import { CreateInstitutionDto, CreateInstitutionSchema } from "../dtos/create-institution.dto";
import { InstitutionService } from "./institution.service";
import { InstitutionMapper } from "../mappers/institution.mapper";
import { HttpException } from "@/app/core/exceptions/http-exception";

export class InstitutionServiceImpl implements InstitutionService {
  constructor(private readonly repository: InstitutionRepository) {}

  async createInstitution(createInstitutionDto: CreateInstitutionDto): Promise<string> {
    const validated = CreateInstitutionSchema.parse(createInstitutionDto);
    const exists = await this.repository.findByCnpj(validated.cnpj);

    if (exists) {
      throw new HttpException("Institution with this CNPJ already exists");
    }

    const created = await this.repository.create(validated);
    const entity = InstitutionMapper.toEntity(created);
    return entity.id;
  }
}
