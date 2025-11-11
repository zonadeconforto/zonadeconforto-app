import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dtos/login.dto";
import { LoggedUserDTO } from "../dtos/output/logged-user.dto";

/**
 * Controller responsible for handling user authentication requests.
 */
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * Authenticate a user by email and password.
   * @param dto - The login data transfer object.
   */
  async login(dto: LoginDTO): Promise<LoggedUserDTO> {
    return this.service.login(dto);
  }
}
