import "dotenv/config";
import { env, type PrismaConfig } from "prisma/config";

export default {
  schema: "prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
} satisfies PrismaConfig;
