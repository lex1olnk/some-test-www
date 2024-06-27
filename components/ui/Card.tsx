import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import defImg from "@/public/pic1.png";

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bookId: number;
  title?: string;
  showRating?: boolean;
  rating?: number;
  width?: number;
}
const hideText = (text: string, maxlimit: number) => {
  return text.length > maxlimit
    ? text.substring(0, maxlimit - 3) + "..."
    : text;
};

export const Card = ({
  bookId,
  title,
  showRating = false,
  rating,
  width,
}: CardProps) => {
  const text = title && hideText(title, 22);

  return (
    <Link
      href={`/book/${bookId}`}
      className="aspect-[0.69318181818] h-full flex my-auto p-1"
    >
      <Image
        src={defImg}
        alt="s"
        className="relative rounded-md my-auto z-30"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0) 75%, rgba(0,0,0,0.85) 97%, rgba(0,0,0, 1) 100%)",
        }}
      />

      {text && (
        <>
          {" "}
          <div
            className="absolute bottom-1 h-16 z-40 w-[176.5px] rounded-md"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(87,87,87,0) 67%, rgba(255,255,255,0) 100%)",
            }}
          ></div>
          {rating && (
            <div>
              {/* <Star className='my-auto mr-1' /> */}
              {rating}
            </div>
          )}
          <p className="absolute bottom-2 ml-1 text-white z-50">{text}</p>
        </>
      )}
    </Link>
  );
};
