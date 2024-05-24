import Link from "next/link";
import { Title } from "../ui/Title";
import db from "@/lib/prisma";

const getUpdateFeedBooks = async () => {
  const latestChaptersWithBooks = await db.chapter.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      book: {
        select: {
          id: true,
          name: true,
          originalName: true,
          type: true,
          author: true,
          genres: {
            select: {
              name: true,
            },
            take: 3,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // Получить последние 5 добавленных глав
  });

  return latestChaptersWithBooks;
};

const book = () => {
  return <div></div>;
};

export const UpdateFeed = async () => {
  const chapters = await getUpdateFeedBooks();

  return (
    <div>
      <Title>Лента обновлений</Title>

      {chapters.map((chapter) => (
        <div
          key={chapter.id + chapter.book.name}
          className="h-[152px] flex flex-row my-2 first:mt-0"
        >
          <div className="h-full bg-slate-400 w-[105px]">img</div>
          <div className="h-full w-full bg-white flex flex-col">
            <Link href={`/book/${chapter.book.id}`}>{chapter.book.name}</Link>
            <div>{chapter.book.originalName}</div>
            <div className="flex flex-row">
              {chapter.book.genres.map((genre) => (
                <div key={chapter.book.name + genre.name}>{genre.name}</div>
              ))}
            </div>
            <div className="">{chapter.name}</div>
            <div>{chapter.book.type}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
