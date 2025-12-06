-- Migration to add updatedAt fields to existing tables
-- This handles existing data by setting updatedAt = createdAt for existing rows

-- Add updatedAt to Board table
ALTER TABLE "Board" 
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to use createdAt as updatedAt
UPDATE "Board" 
SET "updatedAt" = "createdAt" 
WHERE "updatedAt" IS NULL;

-- Add updatedAt to Tile table (if it doesn't exist)
ALTER TABLE "Tile" 
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing tiles to use createdAt as updatedAt
UPDATE "Tile" 
SET "updatedAt" = "createdAt" 
WHERE "updatedAt" IS NULL;

