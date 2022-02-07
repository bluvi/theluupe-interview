const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'brunoluvizotto@gmail.com' },
    update: {},
    create: {
      email: 'brunoluvizotto@gmail.com',
      firstName: 'Bruno',
      lastName: 'Luvizotto',
      password: '$2b$10$SOQzFREnnZcNkMK8PhKcpO3pUjiDr.pFlIXwjT1j.EvT9z28sAZVe',
      posts: {
        create: {
          title: 'Checkout my LinkedIn :)',
          text: 'https://www.linkedin.com/in/bruno-valdrighi-luvizotto/?locale=en_US',
        },
      },
    },
  });

  prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      firstName: 'Bob',
      lastName: 'Doe',
      password: '$2b$10$uHXpOaw0GzYq3AK0UIXJb.U83Q3fm.IWsuFKvEfXPhAY3L8/TB4ae',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            text: 'https://twitter.com/prisma',
          },
          {
            title: 'Follow Nexus on Twitter',
            text: 'https://twitter.com/nexusgql',
          },
        ],
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
