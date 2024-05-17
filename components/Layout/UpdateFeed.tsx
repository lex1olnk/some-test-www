import { ComponentName } from "../ComponentName";
import db from "@/lib/prisma";

const getUpdateFeedBooks = async () => {
  const books = await db.book.findMany({
    take: 5,
  });

  return books;
};

export const UpdateFeed = async () => {
  const books = await getUpdateFeedBooks();

  return (
    <div>
      <ComponentName title={"Лента обновлений"} />

      {books.map((book) => (
        <div key={book.id}>{book.id}</div>
      ))}
    </div>
  );
};
