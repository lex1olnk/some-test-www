import { Title } from "../ui/Title";
import db from "@/lib/prisma";
import { Card } from "../ui/Card";
import Carousel from "../ui/Carousel";

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

      <div className="bg-white h-[197px] ">
        <Carousel books={books} sliderCount={6.4} space={4} />
      </div>
    </div>
  );
};
