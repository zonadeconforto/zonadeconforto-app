import { UserDatasource } from "@/modules/user/datasources/user.datasource";
import { UserController } from "@/modules/user/controllers/user.controller";
import { UserServiceImpl } from "@/modules/user/services/user.service.impl";
import { AuthDatasource } from "@/modules/auth/datasources/auth.datasource";
import { AuthService } from "@/modules/auth/services/auth.service";
import { AuthController } from "@/modules/auth/controllers/auth.controller";
import { TokenJwtService } from "@/modules/auth/services/token-jwt.service";
import { InstitutionController } from "@/modules/institution/controllers/institution.controller";
import { InstitutionServiceImpl } from "@/modules/institution/services/institution.service.impl";
import { InstitutionDatasource } from "@/modules/institution/datasources/institution.datasource";
import { InvestmentProductServiceImpl } from "@/modules/investment-product/services/investment-product.service.impl";
import { InvestmentProductController } from "@/modules/investment-product/controllers/investment-product.controller";
import { InvestmentProductPrismaDatasource } from "@/modules/investment-product/datasources/investment-product.datasource";

// USER DEPENDENCIES

const datasource = new UserDatasource();
const service = new UserServiceImpl(datasource);
export const userController = new UserController(service);

// AUTH DEPENDENCIES

const authDatasource = new AuthDatasource();
const tokenService = new TokenJwtService(
  process.env.JWT_SECRET_KEY || "dev_secret",
  process.env.JWT_TOKEN_EXPIRATION_TIME || "7d"
);
const authService = new AuthService(authDatasource, tokenService);
export const authController = new AuthController(authService);

// INSTITUTION DEPENDENCIES

const institutionDatasource = new InstitutionDatasource();
const institutionService = new InstitutionServiceImpl(institutionDatasource);
export const institutionController = new InstitutionController(
  institutionService
);

// INVESTMENT PRODUCT DEPENDENCIES

const investmentProductRepository = new InvestmentProductPrismaDatasource();
export const investmentProductService = new InvestmentProductServiceImpl(
  investmentProductRepository
);
export const investmentProductController = new InvestmentProductController(
  investmentProductService
);
