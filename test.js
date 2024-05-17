const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const createFakeChapter = async (bookId) => {
  const fakeChapter = {
    accessStatus: faker.random.arrayElement(["public", "private", "premium"]),
    bookId: bookId,
    discussionId: null, // Заглушка, пока не создано обсуждение
    chapterNumber: faker.datatype.number(),
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    createdBy: faker.name.findName(),
    updatedBy: faker.name.findName(),
    chapterStatus: faker.random.arrayElement(["progress", "complete"]),
    costChapter: faker.finance.amount(),
    costAudio: faker.finance.amount(),
    content: faker.lorem.paragraphs(3),
    views: faker.datatype.number(),
    likes: faker.datatype.number(),
    downloaded: faker.datatype.number(),
  };

  const createdChapter = await prisma.chapter.create({ data: fakeChapter });

  const fakeDiscussion = {
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    Chapters: {
      connect: { id: createdChapter.id }, // Связываем созданную главу с обсуждением
    },
  };

  await prisma.discussion.create({ data: fakeDiscussion });
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
