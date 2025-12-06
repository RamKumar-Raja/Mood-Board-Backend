# Database Migration Guide - Adding updatedAt Fields

## Problem
You have existing data in your database, and Prisma can't add required `updatedAt` columns without a default value.

## Solution Options

### Option 1: Manual SQL Migration (Recommended if you have existing data)

Run this SQL directly in your database (via Supabase dashboard or psql):

```sql
-- Add updatedAt to Board table with default
ALTER TABLE "Board" 
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to use createdAt as updatedAt
UPDATE "Board" 
SET "updatedAt" = "createdAt";

-- Add updatedAt to Tile table with default
ALTER TABLE "Tile" 
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing tiles to use createdAt as updatedAt
UPDATE "Tile" 
SET "updatedAt" = "createdAt";
```

After running this SQL, then run:
```bash
npx prisma db push
```

### Option 2: Reset Database (Only if you don't need existing data)

If you're okay losing existing data:
```bash
npx prisma migrate reset
```

### Option 3: Use Prisma Migrate (Proper Migration)

1. Create a migration:
```bash
npx prisma migrate dev --name add_updated_at_fields --create-only
```

2. Edit the generated migration SQL file to add defaults:
```sql
-- AlterTable
ALTER TABLE "Board" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
UPDATE "Board" SET "updatedAt" = "createdAt";

ALTER TABLE "Tile" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
UPDATE "Tile" SET "updatedAt" = "createdAt";
```

3. Apply the migration:
```bash
npx prisma migrate dev
```

## Recommended Steps

1. **If you have important data**: Use Option 1 (Manual SQL)
2. **If you're in development and can reset**: Use Option 2
3. **If you want proper migrations**: Use Option 3

## After Migration

Once the columns are added, your schema will be in sync and `@updatedAt` will work automatically for all future updates.

