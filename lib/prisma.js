import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres";
  const isCloudDb = connectionString.includes("supabase") || connectionString.includes("neon") || connectionString.includes("amazonaws.com") || process.env.NODE_ENV === "production";
  
  const pool = new pg.Pool({
    connectionString,
    ssl: isCloudDb ? { rejectUnauthorized: false } : false,
  });
  
  const adapter = new PrismaPg(pool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
