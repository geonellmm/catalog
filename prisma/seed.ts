import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1Pass = await bcrypt.hash('password123', 10);
  const user2Pass = await bcrypt.hash('password456', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: user1Pass,
      firstName: 'Alice',
      lastName: 'Wonderland',
      type: 'Admin',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: user2Pass,
      firstName: 'Bob',
      lastName: 'Builder',
      type: 'Customer',
    },
  });

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Luxury Watch',
      description: 'A luxury watch with diamonds',
      price: 999.99,
      stock: 5,
      brand: 'Rolex',
      referenceNumber: 'ABC123456789'
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Sports Watch',
      description: 'A sports watch with multiple features',
      price: 199.99,
      stock: 20,
      brand: 'Casio',
      referenceNumber: 'ABC123456790'
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
