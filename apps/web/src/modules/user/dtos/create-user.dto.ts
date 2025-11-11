import { z } from "zod";
import { Role } from "../enums/role.enum";

/**
 * Zod schema for validating incoming user creation payloads.
 */
export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must have at least 6 characters"),
  role: z.enum(Role).optional().default(Role.CLIENT),
});

/**
 * TypeScript type inferred from the Zod schema.
 * Used throughout the service and controller layers.
 */
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
