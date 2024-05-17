import db from "@/lib/prisma";
import { addDays } from "date-fns";
const faker = require("faker");

const getNewBooks = async () => {
  const newBooks = await db.book.findMany({
    take: 5,
  });

  return newBooks;
};

export const Top = async () => {
  const books = await getNewBooks();

  return (
    <div>
      <div>
        {books.map((book) => (
          <div key={book.id + book.name}>{book.name}</div>
        ))}
      </div>
    </div>
  );
};
