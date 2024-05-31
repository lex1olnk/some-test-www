"use client";

import { Prisma } from "@prisma/client";
import styles from "./styles.module.css";

type DiscussionWithComments = Prisma.DiscussionGetPayload<{
  include: {
    comments: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            role: true;
          };
        };
        childrens: {
          include: {
            user: {
              select: {
                id: true;
                name: true;
                role: true;
              };
            };
          };
        };
      };
    };
  };
}>;

type CommentWithChildrens = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
      };
    };
    childrens: true;
  };
}>;

export const CommentSection = ({
  discussion,
}: {
  discussion: DiscussionWithComments;
}) => {
  const comments = discussion.comments.map((item) => {
    const date = new Date(item.createdAt);
    const currentDate = new Date();
    const fullDayDifference = Math.floor(
      (currentDate.getTime() - date.getTime()) / 86400000
    );
    return { ...item, diff: fullDayDifference };
  });
  // Функция для рекурсивного отображения комментариев и их дочерних комментариев
  const renderComments = (comments: any) => {
    return comments.map((comment: any) => (
      <div className="bg-white mt-2 ml-4" key={comment.id}>
        <div>
          {comment.user.name} [ {comment.user.role} ]
        </div>
        <div>{comment.diff} дней назад</div>
        <div>{comment.text}</div>
        <div className={styles.commentButtons}>
          <button>{comment.likes} Понравилось</button>
          <button>{comment.dislikes} Не понравилось</button>
          <button>Ответить</button>
        </div>
        {/* Рекурсивно отображаем дочерние комментарии */}
        {comment.childrens && renderComments(comment.childrens)}
      </div>
    ));
  };

  return (
    <div>
      <h2>Comments for </h2>
      <input
        type="text"
        // value={newComment}
        // onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a new comment"
      />
      <button type="submit">Add Comment</button>
      {/* Отображаем корневые комментарии */}
      {comments.map(
        (comment) =>
          comment.parentId === null && (
            <div className="bg-white my-2 p-4" key={comment.id}>
              <div>
                {comment.user.name} [ {comment.user.role} ]
              </div>
              <div>{comment.diff} дней назад</div>
              <div>{comment.text}</div>
              <div className={styles.commentButtons}>
                <button>{comment.likes} Понравилось</button>
                <button>{comment.dislikes} Не понравилось</button>
                <button>Ответить</button>
              </div>

              {/* Рекурсивно отображаем дочерние комментарии */}
              {comment.childrens.length > 0 &&
                renderComments(comment.childrens)}
            </div>
          )
      )}
    </div>
  );
};
