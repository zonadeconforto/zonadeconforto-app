import { CreateInstitutionDto, CreateInstitutionSchema } from "../dtos/create-institution.dto";
import { UpdateInstitutionDto } from "../dtos/update-institution.dto";
import { InstitutionService } from "./institution.service";
import { InstitutionMapper } from "../mappers/institution.mapper";
import { HttpException } from "@/app/core/exceptions/http-exception";
import { InstitutionOutputDto } from "../dtos/institution-output.dto";
import { InstitutionModel } from "../models/institution.model";
import { InstitutionRepository } from "../repositories/institution.repository";

export class InstitutionServiceImpl implements InstitutionService {
  constructor(private readonly repository: InstitutionRepository) {}
  findByCnpj(cnpj: string): Promise<InstitutionModel | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<InstitutionModel[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<InstitutionModel | null> {
    throw new Error("Method not implemented.");
  }

  async createInstitution(createDto: CreateInstitutionDto): Promise<string> {
    const validated = CreateInstitutionSchema.parse(createDto);
    const exists = await this.repository.findByCnpj(validated.cnpj);

    if (exists) {
      throw new HttpException("Institution with this CNPJ already exists", 400);
    }

    const created = await this.repository.create(validated);
    return created.id;
  }

  async findAllInstitutions(): Promise<InstitutionOutputDto[]> {
    const items = await this.repository.findAll();
    return items.map(i => InstitutionMapper.toOutput(InstitutionMapper.toEntity(i)));
  }

  async deleteInstitution(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateInstitution(id: string, data: UpdateInstitutionDto): Promise<InstitutionOutputDto> {
    const exists = await this.repository.findById(id);

    if (!exists) {
      throw new HttpException("Institution not found", 404);
    }

    const updated = await this.repository.update(id, data);
    return InstitutionMapper.toOutput(InstitutionMapper.toEntity(updated));
  }

  // async findByCnpj(cnpj: string): Promise<InstitutionModel | null> {
  //   throw new Error("Method not implemented.");
  // }

  // async findAll(): Promise<InstitutionModel[]> {
  //   throw new Error("Method not implemented.");
  // }

  // async findById(id: string): Promise<InstitutionModel | null> {
  //   return await this.repository.findById(id);
}
