import { ComponentName } from "../ComponentName";
import db from "@/lib/prisma";
import { Card } from "../ui/Card";

const getNewBooks = async () => {
  const currentDate = new Date();
  const books = await db.book.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  return books;
};

export const NewBooks = async () => {
  const books = await getNewBooks();

  return (
    <div className="">
      <ComponentName title={"Новинки"} />

      <div className="bg-white flex flex-row h-[197px]">
        {books.map((book) => (
          <Card title={book.name} key={book.id + book.name} />
        ))}
      </div>
    </div>
  );
};
