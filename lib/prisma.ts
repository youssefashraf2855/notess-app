import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../app/generated/prisma/client"

const connectionString = process.env.DATABASE_URL!

const adapter = new PrismaNeon({
  connectionString,
})

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}