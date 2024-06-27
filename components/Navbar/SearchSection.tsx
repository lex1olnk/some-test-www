import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Book, Prisma } from "@prisma/client";
import Image from "next/image";
import defImage from "@/public/pic1.png";
import { NextResponse } from "next/server";
import Link from "next/link";
import classNames from "classnames";

interface BookType extends Book {
  images: {
    id: number;
    src: string;
    bookId: number;
  }[];
  Rating: number;
}

const Result = ({
  book,
  handleClick,
}: {
  book: BookType;
  handleClick: () => void;
}) => {
  return (
    <Link
      className="w-full h-[84px] bg-white flex flex-row my-1 rounded-md"
      href={`/book/${book.id}`}
    >
      {
        <Image
          src={book.images[0]?.src ?? defImage}
          alt={book.name}
          width={57}
          height={84}
        />
      }
      <div className="p-2 my-auto">
        <p>{book.name}</p>
        <p>{book.originalName}</p>
        <div className="flex flex-row">
          <p>{book.type}</p>
          <p className="ml-2">{book.Rating}</p>
        </div>
      </div>
    </Link>
  );
};

export const SearchSection = ({
  handleClick,
  show,
}: {
  handleClick: () => void;
  show: boolean;
}): JSX.Element => {
  const [field, setField] = useState<string>("");
  const [data, setData] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(field);

  useEffect(() => {
    if (field.length > 1) {
      const handler = setTimeout(() => {
        setDebouncedQuery(field);
      }, 500); // Задержка 500 мс

      return () => {
        clearTimeout(handler);
      };
    }
  }, [field]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 0) {
        try {
          const response = await fetch(
            `/api/book/search?query=${debouncedQuery}`
          );
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setData([]);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);
  };

  return (
    <>
      <div
        className={classNames(
          "fixed w-full  bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in",
          {
            "visible, opacity-100 h-full": show,
            "invisibile opacity-0 h-0": !show,
          }
        )}
        onClick={handleClick}
      ></div>
      <div
        className={classNames(
          "w-1/2 left-1/2 -translate-x-1/2 absolute top-4 z-40",
          {
            "visible, opacity-100": show,
            "invisibile opacity-0 hidden": !show,
          }
        )}
      >
        <Input name="field" onChange={handleChange} />
        {data?.length > 0 &&
          data.map((book: BookType) => (
            <Result
              book={book}
              key={book.id + book.name}
              handleClick={handleClick}
            />
          ))}
      </div>
    </>
  );
};
