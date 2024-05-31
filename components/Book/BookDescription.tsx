import { Book } from "@/interfaces/interfaces";
import { Fandom, Genre, Tag } from "@prisma/client";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import Discussion from "../Discussion/Discussion";

const ShowItems = ({
  items,
  name,
}: {
  items: Genre[] | Fandom[] | Tag[];
  name: string;
}) => {
  return (
    <div>
      {name}
      {items.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
};

export const BookDescription = ({ book }: any) => {
  return (
    <>
      <p>Описание</p>
      <p>{book.description}</p>
      <div className="w-[260px] h-[400px] bg-slate-400 mx-auto">image</div>
      <p>Оценка</p>
      <div className="flex flex-row">
        <div className="flex-1">
          <p>Рейтинг произведения</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <div className="flex-1">
          <p>Рейтинг произведения</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
      <ShowItems items={book.genres} name="Жанры" />
      <ShowItems items={book.fandoms} name="Фандомы" />
      <ShowItems items={book.tags} name="Теги" />
      {book.translator?.booksCreatedByMe.length ? (
        <>
          {" "}
          <p>Другие работы переводчика</p>
          <div className="h-60 flex flex-row">
            {book.translator?.booksCreatedByMe.map((item: any) => (
              <Card
                key={item.name + item.id}
                bookId={item.id}
                title={item.name}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      <Button>Подать жалобу</Button>
      <Discussion id={book.discussionId} />
    </>
  );
};
