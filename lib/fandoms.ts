import { PrismaClient } from '@prisma/client/extension'


async function add() {
  const db = new PrismaClient();

  for (let i = 0; i < 15; i++) {
    await db.fandom.create({
      data: {
        name: "fandom" + i
      }
    })
  }
}
