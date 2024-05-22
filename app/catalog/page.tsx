import { CatalogBook } from "@/components/Catalog/CatalogBook";
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

type filterProps = {
  statusTranslate: string;
  age: string;
  yearBefore: string;
  yearAfter: string;
  chaptersBefore: string;
  chaptersAfter: string;
  ratingBefore: string;
  ratingAfter: string;
  genres: string[];
  tags: string[];
  fandoms: string[];
};

const getBooksByFilter = async (props: filterProps) => {
  const {
    statusTranslate,
    age,
    yearBefore,
    yearAfter,
    chaptersBefore,
    chaptersAfter,
    ratingBefore,
    ratingAfter,
    genres,
    tags,
    fandoms,
  } = props;
  const books = await db.book.findMany({
    select: {
      id: true,
      name: true,
      Rating: true,
      type: true,
      year: true,
      author: true,
      translator: true,
      Chapter: {},
      _count: {
        select: {
          Chapter: {},
        },
      },
      tags: {
        take: 2,
      },
      fandoms: {
        take: 2,
      },
      genres: {
        take: 2,
      },
      description: true,
    },
    where: {
      statusTranslate: "ONGOING",
      adult: age !== "all",
      year: {
        gte: Number(yearBefore),
        lte: Number(yearAfter),
      },
      Chapter: {
        some: {
          id: {
            gte: Number(chaptersBefore),
            lte: Number(chaptersAfter),
          },
        },
      },
      Rating: {
        some: {
          rating: {
            gte: Number(ratingBefore),
            lte: Number(ratingAfter),
          },
        },
      },
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
  searchParams: {
    statusTranslate = "",
    age = "all",
    yearBefore = "",
    yearAfter = "",
    chaptersBefore = "",
    chaptersAfter = "",
    ratingBefore = "",
    ratingAfter = "",
    fandoms = [],
    genres = [],
    tags = [],
  },
}: {
  searchParams: {
    statusTranslate: string;
    age: string;
    yearBefore: string;
    yearAfter: string;
    chaptersBefore: string;
    chaptersAfter: string;
    ratingBefore: string;
    ratingAfter: string;
    fandoms: [];
    genres: [];
    tags: [];
  };
}) {
  const { genre, fandom, tag } = await getFilterData();

  const books = await getBooksByFilter({
    statusTranslate,
    age,
    yearBefore,
    yearAfter,
    chaptersBefore,
    chaptersAfter,
    ratingBefore,
    ratingAfter,
    genres: Array.isArray(genres) ? genres : [genres],
    fandoms: Array.isArray(fandoms) ? fandoms : [fandoms],
    tags: Array.isArray(tags) ? tags : [tags],
  });
  return (
    <div className="flex flex-row text-black max-w-7xl mx-auto">
      <div className="flex-1">
        <Title>Каталог</Title>
        <div>SearchInput</div>
        <Suspense fallback={<div>Loading...</div>}>
          {books &&
            books.map((book) => (
              <CatalogBook key={book.id + book.name} book={book} />
            ))}
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Filter genres={genre} fandoms={fandom} tags={tag} />
      </Suspense>
    </div>
  );
}
