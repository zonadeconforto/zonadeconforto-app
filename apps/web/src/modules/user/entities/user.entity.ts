import { Role } from "../enums/role.enum";

/**
 * Domain representation of a User.
 * Keeps business rules and invariants independent from ORM.
 */
export class UserEntity {
  constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: Role,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}

  /**
   * Factory method for creating a new user before persistence.
   */
  static build(
    name: string,
    email: string,
    passwordHash: string,
    role: Role = Role.CLIENT
  ): UserEntity {
    return new UserEntity(
      null,
      name,
      email,
      passwordHash,
      role,
      new Date(),
      new Date()
    );
  }
}
