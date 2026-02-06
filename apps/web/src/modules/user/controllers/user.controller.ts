import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { HttpException } from "@/app/core/exceptions/http-exception";
import { TokenService } from "@/modules/auth/services/token.service";
import { UpdateUserDTO } from "../dtos/update-user.dto";

/**
 * Controller for handling user-related HTTP routes.
 */
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  /**
   * Creates a new user.
   */
  async get(request: Request) {
    const userId = await this.getUserIdFromRequest(request);

    if (!userId) {
      throw new HttpException("Unauthorized", 401);
    }

    return await this.userService.findById(userId);
  }
  async listAll(request: Request) {
    const userId = await this.getUserIdFromRequest(request);

    if (!userId) {
      throw new HttpException("Unauthorized", 401);
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpException("Unauthorized", 401);
    }

    if (user.role !== "ADMIN") {
      throw new HttpException("Forbidden", 403);
    }

    return this.userService.listAll();
  }

  async update(req: Request, data: UpdateUserDTO) {
    const userId = await this.getUserIdFromRequest(req);

    if (!userId) {
      throw new HttpException("Unauthorized", 401);
    }

    return this.userService.update(userId, data);
  }

  async create(data: CreateUserDTO): Promise<string> {
    return await this.userService.createUser(
      data.name,
      data.email,
      data.password,
      data.role,
      data.phone,
      data.cpf
    );
  }
  /**
   * Extracts and validates the authenticated user ID from the request.
   *
   * This method verifies the JWT using the same TokenService
   * used during authentication, ensuring token consistency.
   *
   * If the token is missing, invalid, or expired, null is returned.
   */

  private async getUserIdFromRequest(req: Request): Promise<string | null> {
    const auth = req.headers.get("authorization");

    if (!auth) return null;

    const [type, token] = auth.split(" ");

    if (type !== "Bearer" || !token) return null;

    try {
      // Validate token using the shared TokenService instance
      // to avoid signature mismatches between auth and API layers.s
      const payload = await this.tokenService.verifyToken(token);

      const userId = payload.id;

      if (typeof userId !== "string") {
        return null;
      }
      return userId;
    } catch (err) {
      // console.error(err)
      return null;
    }
  }
}
