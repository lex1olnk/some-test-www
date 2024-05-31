import db from "@/lib/prisma";
import { Suspense, useState } from "react";
import { BookHead } from "@/components/Book/BookHead";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Chapters } from "@/components/Book/Chapters";
import { BookDescription } from "@/components/Book/BookDescription";

const getBookInformation = async (bookId: string) => {
  const headInfo = await db.book.findUnique({
    where: {
      id: Number(bookId),
    },
    select: {
      id: true,
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
      discussionId: true,
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
          id: true,
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

export default async function Page({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const { headInfo, description, chapters } = await getBookInformation(
    params.bookId
  );
  if (!headInfo || !description || !chapters) {
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
            content: <BookDescription book={description} key={1} />,
            value: "Описание",
          },
          {
            content: (
              <Chapters key={2} chapters={chapters} bookId={headInfo.id} />
            ),
            value: "Главы",
          },
        ]}
      >
        asdasd
      </Navigation>
    </div>
  );
}
