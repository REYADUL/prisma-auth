import { PrismaClient } from '@prisma/client';

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

const db = prisma;
export default db;
