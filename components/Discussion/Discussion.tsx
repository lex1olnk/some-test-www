import { Comment } from "@prisma/client";
import db from "@/lib/prisma";
import { Comp } from "./Comp";

const getDiscussion = async (id: number) => {
  const discussion = await db.discussion.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          childrens: true,
        },
      },
    },
  });
  return discussion;
};

const Discussion = async ({ id }: { id: number }) => {
  const discussion = await getDiscussion(id);

  if (!discussion) return <div></div>;

  return (
    <div>
      <h2>Comments</h2>
      <Comp discussion={discussion} />
    </div>
  );
};

export default Discussion;
