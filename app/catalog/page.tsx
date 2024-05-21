import { Filter } from "@/components/Catalog/Filter";
import { Title } from "@/components/ui/Title";
import db from "@/lib/prisma";
import { Genre } from "@prisma/client";
import { Suspense } from "react";

const getFilterData = async () => {
  const genre = await db.genre.findMany();
  const tag = await db.tag.findMany();
  const fandom = await db.fandom.findMany();

  return { genre, tag, fandom };
};

const getBooksByFilter = async ({
  genres,
  tags,
  fandoms,
}: {
  genres: string[];
  tags: string[];
  fandoms: string[];
}) => {
  const books = await db.book.findMany({
    where: {
      genres:
        genres && genres.length
          ? {
              some: {
                name: {
                  in: genres,
                },
              },
            }
          : {}, // Пустое условие, если массив genres пустой
      fandoms:
        fandoms && fandoms.length
          ? {
              some: {
                name: {
                  in: fandoms,
                },
              },
            }
          : {}, // Пустое условие, если массив genres пустой
      tags:
        tags && tags.length
          ? {
              some: {
                name: {
                  in: tags,
                },
              },
            }
          : {}, // Пустое условие, если массив genres пустой
    },
    take: 10,
  });
  return books;
};

export default async function Page({
  searchParams: { statusTranslate, age, fandoms = [], genres = [], tags = [] },
}: {
  searchParams: {
    statusTranslate: string;
    age: string;
    fandoms: [];
    genres: [];
    tags: [];
  };
}) {
  const { genre, fandom, tag } = await getFilterData();
  console.log(fandoms, genres);
  console.log(genres, [genres]);
  const books = await getBooksByFilter({
    genres: Array.isArray(genres) ? genres : [genres],
    fandoms: Array.isArray(fandoms) ? fandoms : [fandoms],
    tags: Array.isArray(tags) ? tags : [tags],
  });
  return (
    <div className="flex flex-row text-black max-w-7xl mx-auto">
      <div className="flex-1">
        <Title>Каталог</Title>
        <div>SearchInput</div>
        {books && books.map((book) => <div key={book.id}>{book.name}</div>)}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Filter genres={genre} fandoms={fandom} tags={tag} />
      </Suspense>
    </div>
  );
}
