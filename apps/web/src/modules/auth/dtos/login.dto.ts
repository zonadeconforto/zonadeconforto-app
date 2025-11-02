import { z } from "zod";

/**
 * Zod schema for login validation.
 */
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * TypeScript type inferred from the schema.
 */
export type LoginDTO = z.infer<typeof LoginSchema>;
