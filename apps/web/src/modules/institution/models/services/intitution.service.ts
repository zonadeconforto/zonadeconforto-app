import { IInstitutionRepository } from "../repositories/institution.repository.ts";
import {
  CreateInstitutionSchema,
  CreateInstitutionDto,
} from "../dtos/create-institution.dto.ts";
import { InstitutionMapper } from "../mappers/institution.mapper.ts";

export class InstitutionService {
  constructor(private readonly repo: IInstitutionRepository) {}

  async create(data: CreateInstitutionDto) {
    const validated = CreateInstitutionSchema.parse(data);

    const exists = await this.repo.findByCnpj(validated.cnpj);
    if (exists) {
      //não sei se é melhor deixar essa mensagem de erro em inglês ou em português
      //na duvida deixei em inglês
      throw new Error("Institution with this CNPJ already exists");
    }

    const created = await this.repo.create(validated);
    const entity = InstitutionMapper.toEntity(created);
    return InstitutionMapper.toOutput(entity);
  }
}
