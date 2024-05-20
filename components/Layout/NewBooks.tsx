import { Title } from "../ui/Title";
import db from "@/lib/prisma";
import { Card } from "../ui/Card";

const getNewBooks = async () => {
  const currentDate = new Date();
  const books = await db.book.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 7,
  });

  return books;
};

export const NewBooks = async () => {
  const books = await getNewBooks();

  return (
    <div className="">
      <Title>Новинки</Title>

      <div className="bg-white flex flex-row h-[197px] overflow-hidden">
        {books.map((book) => (
          <Card title={book.name} key={book.id + book.name} bookId={book.id} />
        ))}
      </div>
    </div>
  );
};
