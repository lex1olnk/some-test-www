import db from "@/lib/prisma";
import { Top } from "./Top";

const getTopBooks = async () => {
  const newBooks = await db.book.findMany({
    take: 5,
  });

  return newBooks;
};

export const Tops = async () => {
  const tops = await getTopBooks();

  return (
    <div>
      <div>
        {tops.map((top) => (
          <div key={top.id + top.name}>{top.name}</div>
        ))}
      </div>
    </div>
  );
};
