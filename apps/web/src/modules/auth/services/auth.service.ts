import { AuthRepository } from "../repositories/auth.repository";
import { LoginDTO } from "../dtos/login.dto";
import { HttpException } from "@/app/core/exceptions/http-exception";
import bcrypt from "bcryptjs";
import { TokenService } from "./token.service";
import { LoggedUserDTO } from "../dtos/output/logged-user.dto";

/**
 * Business logic layer responsible for authentication and token generation.
 */
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly tokenService: TokenService
  ) { }

  async login(dto: LoginDTO): Promise<LoggedUserDTO> {
    const user = await this.repository.findByEmail(dto.email);

    if (!user) {
      throw new HttpException("User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new HttpException("Invalid credentials", 401);
    }

    // Generate JWT token using dependency
    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id!,
      role: user.role,
      token,
    };
  }
}
