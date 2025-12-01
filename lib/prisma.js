// lib/prisma.js
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis; 

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// lib/prisma.js
import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis;

// Use a singleton to prevent multiple instances in dev (hot reload)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"], // optional: useful for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { Prisma };
