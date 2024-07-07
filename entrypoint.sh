#!/bin/sh

# Wait for the PostgreSQL service to be ready
until pg_isready -h db -p 5432 -U postgres; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Run Prisma migrations
npx prisma migrate deploy

# Run Prisma seeders
npm run seed_db

# Start the application
npm run start:prod
