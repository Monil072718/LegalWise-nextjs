// // lib/db.js
// import { PrismaClient } from "@prisma/client"

// const globalForPrisma = globalThis

// // Check if we're in development and Prisma is already attached to global
// const prisma = globalForPrisma.prisma || new PrismaClient()

// // Only attach to global in development to prevent connection leaks
// if (process.env.NODE_ENV === "development") {
//   globalForPrisma.prisma = prisma
// }

// export const db = prisma