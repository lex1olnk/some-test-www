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

const createFakeTeam = async (userId) => {
  await prisma.team.create({
    data: {
      name: faker.company.companyName(),
      img: faker.image.imageUrl(),
      likes: faker.datatype.number({ min: 0, max: 1000 }),
      description: "This is a description for Team Alpha.",
      adminId: userId,
      discussion: {
        create: {},
      },
    },
  });
};

const addTeamToExistingUsers = async () => {
  const users = await prisma.user.findMany();
  for (const user of users) {
    await createFakeTeam(user.id);
  }
};

const createFakeTags = async () => {
  const books = await prisma.book.findMany();
  const booksIds = books.map((book) => book.id);

  for (const genre of data.tags) {
    await prisma.tag.create({
      data: {
        name: genre,
        books: {
          connect: {
            id: faker.random.arrayElement(booksIds),
          },
        },
      },
    });
  }

  for (const genre of data.fandoms) {
    await prisma.fandom.create({
      data: {
        name: genre,

        books: {
          connect: {
            id: faker.random.arrayElement(booksIds),
          },
        },
      },
    });
  }
};

const main = async () => {
  //await addDiscussionToExistingBooks(); // Создадим 10 фейковых глав и обсуждений
  await createFakeTags();

  console.log("creating done");
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const data = {
  genres: [
    "Adventure",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Drama",
    "Comedy",
    "Thriller",
    "Mystery",
    "Horror",
    "Action",
    "Historical",
    "Slice of Life",
    "Supernatural",
    "Crime",
    "Musical",
    "Documentary",
    "Animation",
    "Family",
    "Biography",
    "War",
    "Western",
    "Sports",
    "Martial Arts",
    "Psychological",
    "Political",
    "Spy",
    "Disaster",
    "Noir",
    "Road",
    "Satire",
    "Urban",
    "Gothic",
    "Cyberpunk",
    "Steampunk",
    "Dystopian",
    "Utopian",
    "Fairytale",
    "Mythology",
  ],
  tags: [
    "Love Triangle",
    "Forbidden Love",
    "Enemies to Lovers",
    "Best Friends to Lovers",
    "Second Chance",
    "Redemption",
    "Secret Identity",
    "Betrayal",
    "Revenge",
    "Sacrifice",
    "Prophecy",
    "Quest",
    "Journey",
    "Transformation",
    "Coming of Age",
    "Found Family",
    "Dark Past",
    "Alternate Universe",
    "Time Travel",
    "Parallel Worlds",
    "Superpowers",
    "Magic",
    "Witches",
    "Vampires",
    "Werewolves",
    "Aliens",
    "Robots",
    "Ghosts",
    "Demons",
    "Angels",
    "Lost Civilization",
    "Hidden Talents",
    "Royalty",
    "Rebellion",
    "Revolution",
    "Survival",
    "Apocalypse",
    "Post-Apocalyptic",
  ],
  fandoms: [
    "Harry Potter",
    "Lord of the Rings",
    "Star Wars",
    "Star Trek",
    "Marvel",
    "DC Comics",
    "Sherlock Holmes",
    "Doctor Who",
    "Supernatural",
    "Game of Thrones",
    "The Witcher",
    "Percy Jackson",
    "Hunger Games",
    "Divergent",
    "Maze Runner",
    "Twilight",
    "Naruto",
    "One Piece",
    "Dragon Ball",
    "Attack on Titan",
    "My Hero Academia",
    "Sailor Moon",
    "Fullmetal Alchemist",
    "Bleach",
    "Death Note",
    "Fairy Tail",
    "Sword Art Online",
    "Hunter x Hunter",
    "JoJo's Bizarre Adventure",
    "Neon Genesis Evangelion",
    "Ghost in the Shell",
    "Cowboy Bebop",
    "Yu-Gi-Oh!",
    "Digimon",
    "Pokémon",
    "The Legend of Zelda",
    "Final Fantasy",
    "Kingdom Hearts",
  ],
};
