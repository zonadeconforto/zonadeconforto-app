import { InstitutionOutputDto } from "../dtos/institution-output.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { InstitutionModel } from "../models/institution.model";

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
    };
  }
}
