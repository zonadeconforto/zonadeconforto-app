import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";

/**
 * Controller for handling user-related HTTP routes.
 */
export class UserController {
  constructor(private readonly service: UserService) {}
  /**
   * Creates a new user.
   */
  async create(data: CreateUserDTO): Promise<string> {
    return await this.service.createUser(
      data.name,
      data.email,
      data.password,
      data.role
    );
  }
}
