#!/bin/bash

# Script to migrate from SQLite to PostgreSQL

echo "Starting migration from SQLite to PostgreSQL..."

# Step 1: Regenerate Prisma client
echo "Regenerating Prisma client..."
npx prisma generate

# Step 2: Create migration files
echo "Creating migration files..."
npx prisma migrate dev --name postgres-migration

# Step 3: Apply migrations to the database
echo "Applying migrations to PostgreSQL database..."
npx prisma db push

# Step 4: Check database connection
echo "Verifying database connection..."
npx prisma db pull

echo "Migration complete! Your app should now be using PostgreSQL."
echo "If you still have issues, try restarting your Next.js application."
