"use client";

import { Comment } from "@prisma/client";
import { useState } from "react";

import { Prisma } from "@prisma/client";

type DiscussionWithComments = Prisma.DiscussionGetPayload<{
  include: {
    comments: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
          };
        };
        childrens: true;
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

export const Comp = ({
  discussion,
}: {
  discussion: DiscussionWithComments;
}) => {
  // Функция для рекурсивного отображения комментариев и их дочерних комментариев
  const renderComments = (comments: any) => {
    return comments.map((comment: any) => (
      <div className="bg-white my-2 ml-4" key={comment.id}>
        <div>{comment.text}</div>
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
      {discussion.comments.map(
        (comment) =>
          comment.parentId === null && (
            <div className="bg-white my-2" key={comment.id}>
              <div>{comment.text}</div>
              {/* Рекурсивно отображаем дочерние комментарии */}
              {comment.childrens.length > 0 &&
                renderComments(comment.childrens)}
            </div>
          )
      )}
      {/* Форма для добавления нового комментария */}
    </div>
  );
};
