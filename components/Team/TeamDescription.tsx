import { Book } from "@/interfaces/interfaces";
import { Fandom, Genre, Tag } from "@prisma/client";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export const TeamDescription = ({ team }: any) => {
  return (
    <>
      <p>Описание</p>
      <p>{team.description}</p>
      <div className="w-[260px] h-[400px] bg-slate-400 mx-auto">image</div>
      <div>
        {team.User ? (
          <>
            {" "}
            <p>Работы переводчиков</p>
            <div className="h-60 flex flex-row">
              {team.User.map((user: any) =>
                user.booksCreatedByMe.map((item: any) => (
                  <Card
                    key={item.name + item.id}
                    bookId={item.id}
                    title={item.name}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Button>Подать жалобу</Button>
    </>
  );
};
