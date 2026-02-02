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
import { InvestmentProductController } from "@/modules/investment-product/controllers/investment-product.controller";
import { InvestmentProductServiceImpl } from "@/modules/investment-product/services/investment-product.service.impl";
import { InvestmentProductPrismaDatasource } from "@/modules/investment-product/datasources/investment-product.datasource";
import { SecurityService } from "@/shared/security/utils";
/**
 * Application Dependency Injection Container.
 *
 * Responsible for instantiating and wiring all controllers,
 * services, and datasources with their required dependencies.
 *
 * This file ensures shared instances for example TokenService
 * are reused across modules.
 * NOTE:
 * UserController depends on TokenService for JWT validation.
 * For this reason, its instantiation must happen after
 * the Auth dependencies are initialized.
 */

// USER DEPENDENCIES

const datasource = new UserDatasource();
const service = new UserServiceImpl(datasource);

// AUTH DEPENDENCIES

const authDatasource = new AuthDatasource();
const secret = SecurityService.getJwtSecret();
// Shared TokenService instance used by both Auth and User modules
const tokenService = new TokenJwtService(secret, process.env.JWT_TOKEN_EXPIRATION_TIME || "7d");
const authService = new AuthService(authDatasource, tokenService);
export const authController = new AuthController(authService);
/**
Uses the same TokenService instance as AuthService
to ensure JWT generation and validation share the same secret.
*/
export const userController = new UserController(service, tokenService);

// INSTITUTION DEPENDENCIES

const institutionDatasource = new InstitutionDatasource();
const institutionService = new InstitutionServiceImpl(institutionDatasource);
export const institutionController = new InstitutionController(institutionService);

// INVESTMENT PRODUCT DEPENDENCIES

const investmentProductRepository = new InvestmentProductPrismaDatasource();
export const investmentProductService = new InvestmentProductServiceImpl(
  investmentProductRepository
);
export const investmentProductController = new InvestmentProductController(
  investmentProductService
);
