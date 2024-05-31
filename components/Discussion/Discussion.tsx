import { Comment } from "@prisma/client";
import db from "@/lib/prisma";
import { CommentSection } from "./CommentSection";

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
              role: true,
            },
          },
          childrens: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
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
      <CommentSection discussion={discussion} />
    </div>
  );
};

export default Discussion;
