import db from "@/lib/prisma";
import { Rating } from "@prisma/client";
import styles from "./page.module.css";
import { Book } from "@/interfaces/interfaces";

type BookProps = {
  book: Book;
};

export const BookHead = async ({ book }: any) => {
  const rating = book?.Rating.length
    ? book?.Rating.reduce((accumulator: number, item: Rating) => {
        return accumulator + item.rating;
      }, 0) / book?.Rating.length
    : 0;

  return (
    <div className="bg-white text-black h-full">
      <div className=" w-[1280px] mx-auto z-10 h-[227px] bg-slate-600 absolute">
        background
      </div>
      <div className="relative flex flex-col text-center z-20 text-white">
        <div>{book?.name}</div>
        <div>{book?.originalName}</div>
      </div>
      <div className={styles.head}>
        <div className="flex-grow">
          <div>
            {book?.type}
            {book?.statusTranslate}
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div>
                {book?.authorId}
                <br />
                Автор
              </div>
              <div>
                {book?.likes}
                <br />
                Лайки
              </div>
              <div>
                {book?.views}
                <br />
                Просмотров
              </div>
              <div>
                142 пользователей
                <br />в закладках у
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                {book?.statusTranslate}
                <br />
                статус оригинала
              </div>
              <div>
                {book?._count.Chapter}
                <br />
                Количество глав
              </div>
              <div>
                {book?.year}
                <br />
                Год
              </div>
              <div>
                {rating}
                <br />
                Общий рейтинг
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bookImage}>
          <div className="bg-slate-300 h-[333px]">img</div>
          <button className="w-full py-4 bg-primary text-white">
            Продолжить чтение
          </button>
        </div>
        <div className="flex-grow">translator</div>
      </div>
    </div>
  );
};
