import { Book } from "@/interfaces/interfaces";
import Link from "next/link";
import styles from "./styles.module.css";
import classNames from "classnames";

export const CatalogBook = ({ book }: any) => {
  const arrayMap = [...book.genres, ...book.fandoms, ...book.tags];
  return (
    <div className="flex flex-row h-44 mb-2">
      <div className="h-full w-[122px] bg-slate-400">img</div>
      <div className="flex-1">
        <div className=" bg-yellow-200 py-2 flex flex-row">
          <Link href={`book/${book.id}`} className="ml-2">
            {book.name}
          </Link>
          <p className="ml-4">{book.type}</p>
        </div>
        <div className="p-2">
          <div className={classNames(styles.bookDescription, "mb-0")}>
            <p>Год {book.year}</p>
            <p>Автор {book.author.name}</p>
            <p>Переводчик {book.translator.name}</p>
            <p>Глав {book._count.Chapter}</p>
          </div>
          <div className={styles.bookDescription}>
            {arrayMap.map((tag) => (
              <div key={tag.name}>{tag.name}</div>
            ))}
          </div>
          <div>{book.description}</div>
        </div>
      </div>
    </div>
  );
};
