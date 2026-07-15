import 'server-only';import {PrismaClient} from '@prisma/client';import {PrismaPg} from '@prisma/adapter-pg';
const globalForPrisma=globalThis as unknown as {prisma?:PrismaClient};
const connectionString=process.env.DATABASE_URL??'postgresql://build:build@127.0.0.1:5432/build';
export const prisma=globalForPrisma.prisma??new PrismaClient({adapter:new PrismaPg({connectionString})});
if(process.env.NODE_ENV!=='production')globalForPrisma.prisma=prisma;
