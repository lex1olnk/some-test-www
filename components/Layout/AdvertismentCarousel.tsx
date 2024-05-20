import db from "@/lib/prisma";
import { Card } from "../ui/Card";

const getAdvertismentBooks = async () => {
  const currentDate = new Date();
  const books = await db.adPurchase.findMany({
    where: {
      startDate: {
        lte: currentDate, // startdate должна быть меньше или равна сегодняшнему дню
      },
      endDate: {
        gte: currentDate, // enddate должна быть больше или равна сегодняшнему дню
      },
    },
    include: {
      book: true,
    },
    take: 7,
  });

  return books;
};

export const AdvertismentCarousel = async () => {
  const books = await getAdvertismentBooks();

  return (
    <div className="h-[300px] bg-white">
      <div className="max-w-7xl h-full flex mx-auto overflow-hidden">
        {books.map((book) => (
          <Card key={book.book.id} title={book.book.name} bookId={book.id} />
        ))}
      </div>
    </div>
  );
};
