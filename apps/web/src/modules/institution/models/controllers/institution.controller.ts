import { InstitutionService } from "../services/institution.service";
import { InstitutionDatasource } from "../datasources/institution.datasource";
// instancia qual vai ser a fonte de dados
const datasource = new InstitutionDatasource();
export const institutionService = new InstitutionService(datasource);
