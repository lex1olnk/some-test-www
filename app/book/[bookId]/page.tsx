import db from "@/lib/prisma";
import { Suspense, useState } from "react";
import { BookHead } from "@/components/Book/BookHead";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Chapters } from "@/components/Book/Chapters";
import { Description } from "@/components/Book/Description";

const getBookInformation = async (bookId: string) => {
  const headInfo = await db.book.findUnique({
    where: {
      id: Number(bookId),
    },
    select: {
      name: true,
      originalName: true,
      type: true,
      statusTranslate: true,
      author: true,
      likes: true,
      views: true,
      year: true,
      _count: {
        select: {
          Chapter: {},
        },
      },
      Rating: true,
    },
  });

  const description = await db.book.findUnique({
    where: {
      id: Number(bookId),
    },
    select: {
      description: true,
      genres: true,
      fandoms: true,
      tags: true,
      translator: {
        include: {
          booksCreatedByMe: {
            take: 6,
          },
        },
      },
    },
  });

  const chapters = await db.book.findUnique({
    where: {
      id: Number(bookId),
    },
    select: {
      Chapter: {
        select: {
          name: true,
          chapterStatus: true,
          updatedAt: true,
          views: true,
          likes: true,
        },
      },
    },
  });

  return {
    headInfo,
    description,
    chapters: chapters?.Chapter,
    loaded: true,
  };
};

const BookDescription = () => {
  return <div></div>;
};

export default async function Page({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const { headInfo, description, loaded, chapters } = await getBookInformation(
    params.bookId
  );
  if (!loaded) {
    notFound();
  }
  console.log(chapters);

  return (
    <div className="max-w-7xl mx-auto">
      <Suspense>
        <BookHead book={headInfo} />
      </Suspense>

      <Navigation
        className="mt-[250px]"
        navs={[
          {
            content: <Description book={description} key={1} />,
            value: "Описание",
          },
          { content: <Chapters key={2} chapters={chapters} />, value: "Главы" },
        ]}
      >
        asdasd
      </Navigation>
    </div>
  );
}
