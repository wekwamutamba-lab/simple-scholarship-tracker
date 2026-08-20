CREATE DATABASE finale
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "Scholarship" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255),
    "amount" DOUBLE PRECISION,
    "source" VARCHAR(255),
    "platformName" VARCHAR(255),
    "platformUrl" TEXT,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'SAVED',
    "deadline" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraint linking Scholarship to User
    CONSTRAINT "Scholarship_userId_fkey" 
        FOREIGN KEY ("userId") 
        REFERENCES "User"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);