const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const { connect } = require("http2");

const prisma = new PrismaClient();

const createFakeChapter = async (bookId) => {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const fakeDiscussion = {
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const disc = await prisma.discussion.create({ data: fakeDiscussion });

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
      connect: { id: disc.id },
    },
  };

  await prisma.chapter.create({ data: fakeChapter });
};

const addDiscussionToExistingBooks = async () => {
  const books = await prisma.book.findMany(); // Получаем все существующие книги

  for (const book of books) {
    await createFakeChapter(book.id);
  }
};

const main = async () => {
  await addDiscussionToExistingBooks(); // Создадим 10 фейковых глав и обсуждений
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
