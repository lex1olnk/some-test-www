const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const { addDays } = require("date-fns");
const { connect } = require("http2");

const prisma = new PrismaClient();

const createFakeChapter = async (bookId) => {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const fakeChapter = {
    accessStatus: faker.random.arrayElement(["public", "private", "premium"]),
    chapterNumber: faker.datatype.number(),
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    createdBy: userIds[0],
    updatedBy: userIds[0],
    chapterStatus: faker.random.arrayElement(["progress", "complete"]),
    costChapter: 0,
    costAudio: 0,
    content: faker.lorem.paragraphs(3),
    views: faker.datatype.number(),
    likes: faker.datatype.number(),
    downloaded: faker.datatype.number(),
    Book: {
      connect: { id: bookId },
    },
    Discussion: {
      create: {
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
    },
  };

  await prisma.chapter.create({ data: fakeChapter });
};

const createFakeTeam = async (userId) => {
  await prisma.team.create({
    data: {
      name: faker.company.companyName(),
      img: faker.image.imageUrl(),
      likes: faker.datatype.number({ min: 0, max: 1000 }),
      description: "This is a description for Team Alpha.",
      admin: {
        connect: {
          id: userId,
        },
      },
      discussion: {
        create: {
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
      },
    },
  });
};

async function main() {
  // Создание случайных пользователей

  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  // Создание случайных авторов
  /*   for (let i = 0; i < 15; i++) {
    await prisma.author.create({
      data: {
        value: faker.name.findName(),
      },
    });
  }

  const authors = await prisma.author.findMany();
  const authorIds = authors.map((author) => author.id);

  // Создание случайных книг
  for (let i = 0; i < 15; i++) {
    const rand = faker.random.arrayElement(userIds);
    await prisma.book.create({
      data: {
        adult: faker.datatype.boolean(),
        costChapter: faker.datatype.number({ min: 1, max: 10 }),
        name: faker.lorem.words(3),
        author: {
          connect: {
            id: faker.random.arrayElement(authorIds),
          },
        },
        createdBy: {
          connect: { id: rand },
        },
        updatedBy: {
          connect: { id: rand },
        },
        description: faker.lorem.sentences(3),
        statusTranslate: faker.random.arrayElement(["ONGOING", "FREEZED"]),
        originalName: faker.lorem.words(3),
        translator: {
          connect: { id: rand },
        },
        likes: faker.datatype.number({ min: 0, max: 1000 }),
        type: faker.random.arrayElement([
          "Japanese",
          "Authors",
          "Chinese",
          "Korean",
        ]),
        views: faker.datatype.number({ min: 0, max: 10000 }),
        year: faker.datatype.number({ min: 2015, max: 2023 }),
        discussion: {
          create: {
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent(),
          },
        },
      },
    });
  }



  // Создание случайных подписок
  for (let i = 0; i < 15; i++) {
    await prisma.subscription.create({
      data: {
        type: faker.random.arrayElement(["Basic", "Premium", "VIP"]),
        cost: faker.datatype.float({ min: 1, max: 100 }),
        bookId: faker.random.arrayElement(bookIds),
      },
    });
  }

  for (const book of books) {
    await createFakeChapter(book.id);
  } */
  const books = await prisma.book.findMany();
  const bookIds = books.map((book) => book.id);

  const subscriptions = await prisma.subscription.findMany();
  const subscriptionIds = subscriptions.map((subscription) => subscription.id);

  // Создание случайных покупок подписок
  for (let i = 0; i < 15; i++) {
    const duration = faker.datatype.number({ min: 30, max: 365 }); // продолжительность в днях
    const startDate = faker.date.recent();
    const endDate = addDays(
      startDate,
      faker.datatype.number({ min: 1, max: 30 })
    );
    await prisma.subscriptionPurchase.create({
      data: {
        subscription: {
          connect: {
            id: faker.random.arrayElement(subscriptionIds),
          },
        },
        user: {
          connect: {
            id: faker.random.arrayElement(userIds),
          },
        },
        createdAt: startDate,
        duration: duration,
        endDate: endDate,
        isActive: faker.datatype.boolean(),
      },
    });
  }

  // Создание случайных рекламных покупок
  for (let i = 0; i < 15; i++) {
    const startDate = faker.date.past();
    const endDate = addDays(
      startDate,
      faker.datatype.number({ min: 1, max: 30 })
    ); // продолжительность от 1 до 30 дней
    await prisma.adPurchase.create({
      data: {
        book: { connect: { id: faker.random.arrayElement(bookIds) } },
        user: { connect: { id: faker.random.arrayElement(userIds) } },
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
