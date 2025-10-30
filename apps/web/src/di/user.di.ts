import { UserDatasource } from "@/modules/user/datasources/user.datasource";
import { UserController } from "@/modules/user/controllers/user.controller";
import { UserServiceImpl } from "@/modules/user/services/user.service.impl";

const datasource = new UserDatasource();
const service = new UserServiceImpl(datasource);
export const userController = new UserController(service);
