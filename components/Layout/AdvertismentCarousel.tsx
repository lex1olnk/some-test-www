import db from "@/lib/prisma";
import { Card } from "../ui/Card";
import Carousel from "../ui/Carousel";

const getAdvertismentBooks = async () => {
  const currentDate = new Date();
  const books = await db.book.findMany({
    where: {
      AdPurchase: {
        some: {
          startDate: {
            lte: currentDate, // startdate должна быть меньше или равна сегодняшнему дню
          },
          endDate: {
            gte: currentDate, // enddate должна быть больше или равна сегодняшнему дню
          },
        },
      },
    },

    take: 10,
  });

  return books;
};

export const AdvertismentCarousel = async () => {
  const books = await getAdvertismentBooks();

  return (
    <div className="bg-white my-2 flex">
      <div className="max-w-7xl m-auto">
        <Carousel books={books} sliderCount={6.7} space={8} />
      </div>
    </div>
  );
};
