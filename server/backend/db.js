require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function ensureTablesExist() {
  if (!process.env.DATABASE_URL) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" SERIAL NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

      CREATE TABLE IF NOT EXISTS "Scholarship" (
        "id" SERIAL NOT NULL,
        "title" TEXT NOT NULL,
        "provider" TEXT,
        "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "url" TEXT,
        "deadline" TEXT,
        "status" TEXT NOT NULL DEFAULT 'Not started',
        "documents" TEXT,
        "userId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
      );

      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Scholarship_userId_fkey') THEN
          ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END
      $$;
    `);
    console.log('Database tables verified successfully.');
  } catch (err) {
    console.error('Database initialization warning:', err.message);
  }
}

ensureTablesExist();

module.exports = prisma;
