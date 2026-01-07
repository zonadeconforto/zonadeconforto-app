import { PrismaClient } from "@prisma/client";

declare global {
  var orm: PrismaClient | undefined;
}

export const orm =
  global.orm ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.orm = orm;
