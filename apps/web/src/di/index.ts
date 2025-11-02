import { UserDatasource } from "@/modules/user/datasources/user.datasource";
import { UserController } from "@/modules/user/controllers/user.controller";
import { UserServiceImpl } from "@/modules/user/services/user.service.impl";
import { AuthDatasource } from "@/modules/auth/datasources/auth.datasource";
import { AuthService } from "@/modules/auth/services/auth.service";
import { AuthController } from "@/modules/auth/controllers/auth.controller";
import { TokenJwtService } from "@/modules/auth/services/token-jwt.service";
import { p } from "framer-motion/client";

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
