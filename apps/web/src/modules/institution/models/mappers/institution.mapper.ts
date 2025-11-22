import { InstitutionEntity } from "../entities/institution.entity.ts";
import { InstitutionModel } from "../models/institution.model.ts";
import { InstitutionOutputDto } from "../dtos/institution-output.dto.ts";

export class InstitutionMapper {
  static toEntity(model: InstitutionModel): InstitutionEntity {
    return new InstitutionEntity(model);
  }

  static toOutput(entity: InstitutionEntity): InstitutionOutputDto {
    return {
      id: entity.id,
      name: entity.name,
      cnpj: entity.cnpj,
      type: entity.type,
      site: entity.site,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
