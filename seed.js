const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const { addDays } = require('date-fns');

const prisma = new PrismaClient();

async function main() {
  // Создание случайных пользователей
  for (let i = 0; i < 15; i++) {
    await prisma.user.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }

  const users = await prisma.user.findMany();
  const userIds = users.map(user => user.id);

  // Создание случайных авторов
  for (let i = 0; i < 15; i++) {
    await prisma.author.create({
      data: {
        value: faker.name.findName(),
      },
    });
  }

  const authors = await prisma.author.findMany();
  const authorIds = authors.map(author => author.id);

  // Создание случайных книг
  for (let i = 0; i < 15; i++) {
    await prisma.book.create({
      data: {
        adult: faker.datatype.boolean(),
        costChapter: faker.datatype.number({ min: 1, max: 10 }),
        name: faker.lorem.words(3),
        authorId: faker.random.arrayElement(authorIds),
        createdById: faker.random.arrayElement(userIds),
        updatedById: faker.random.arrayElement(userIds),
        description: faker.lorem.sentences(3),
        statusTranslate: faker.random.arrayElement(['ONGOING', 'FREEZED']),
        originalName: faker.lorem.words(3),
        translatorId: faker.random.arrayElement(userIds),
        likes: faker.datatype.number({ min: 0, max: 1000 }),
        type: faker.random.arrayElement(['Japanese', 'Authors', 'Chinese', 'Korean']),
        views: faker.datatype.number({ min: 0, max: 10000 }),
        year: faker.datatype.number({ min: 1900, max: 2023 }),
      },
    });
  }

  const books = await prisma.book.findMany();
  const bookIds = books.map(book => book.id);

  // Создание случайных подписок
  for (let i = 0; i < 15; i++) {
    await prisma.subscription.create({
      data: {
        type: faker.random.arrayElement(['Basic', 'Premium', 'VIP']),
        cost: faker.datatype.float({ min: 1, max: 100 }),
        bookId: faker.random.arrayElement(bookIds),
      },
    });
  }

  const subscriptions = await prisma.subscription.findMany();
  const subscriptionIds = subscriptions.map(subscription => subscription.id);

  // Создание случайных покупок подписок
  for (let i = 0; i < 15; i++) {
    const duration = faker.datatype.number({ min: 30, max: 365 }); // продолжительность в днях
    const createdAt = faker.date.past();
    const endDate = addDays(startDate, faker.datatype.number({ min: 1, max: 30 }));
    await prisma.subscriptionPurchase.create({
      data: {
        subscriptionId: faker.random.arrayElement(subscriptionIds),
        userId: faker.random.arrayElement(userIds),
        createdAt: createdAt,
        duration: duration,
        endDate: endDate,
        isActive: faker.datatype.boolean(),
      },
    });
  }

  // Создание случайных рекламных покупок
  for (let i = 0; i < 15; i++) {
    const startDate = faker.date.past();
    const endDate = addDays(startDate, faker.datatype.number({ min: 1, max: 30 })); // продолжительность от 1 до 30 дней
    await prisma.adPurchase.create({
      data: {
        bookId: faker.random.arrayElement(bookIds),
        userId: faker.random.arrayElement(userIds),
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });