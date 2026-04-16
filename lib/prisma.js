import { PrismaClient } from "@prisma/client";
// Use global singleton to avoid exhausting connections in dev
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  // Create the Prisma BetterSqlite3 adapter passing the url configuration
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
  
  // Initialize PrismaClient with the adapter
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
