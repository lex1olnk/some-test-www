import { Filter } from "@/components/Catalog/Filter";
import { Title } from "@/components/ui/Title";
import db from "@/lib/prisma";
import { Genre } from "@prisma/client";
import { Suspense } from "react";

const getFilterData = async () => {
  const genres = await db.genre.findMany();
  const tags = await db.tag.findMany();
  const fandoms = await db.fandom.findMany();

  return { genres, tags, fandoms };
};

const getBooksByFilter = async (
  genres: string[],
  tags: string[],
  fandoms: string[]
) => {
  const books = await db.book.findMany({
    where: {
      genres: {
        some: {
          name: {
            in: genres,
          },
        },
      },
    },
    take: 10,
  });
  return books;
};

export default async function Page({
  params: { genre, fandom, tag },
}: {
  params: {
    genre: string[];
    fandom: string[];
    tag: string[];
  };
}) {
  const { genres, fandoms, tags } = await getFilterData();
  console.log(genre, fandom, tag);
  const books = await getBooksByFilter(genre, fandom, tag);
  return (
    <div className="flex flex-row text-black max-w-7xl mx-auto">
      <div className="flex-1">
        <Title>Каталог</Title>
        <div>SearchInput</div>
        {books && books.map((book) => <div key={book.id}>{book.name}</div>)}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Filter genres={genres} fandoms={fandoms} tags={tags} />
      </Suspense>
    </div>
  );
}
