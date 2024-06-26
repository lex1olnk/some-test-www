import { Chapter } from "@prisma/client";
import { Table } from "../ui/Table";

export const Chapters = ({ chapters, bookId }: any) => {
  const newChapters = chapters.map((chapter: any) => {
    const date = new Date(chapter.updatedAt);
    return { ...chapter, updatedAt: date.toDateString() };
  });

  return (
    <div>
      <div></div>
      <Table
        rows={["Название", "Статус", "Обновлено", "Просмотров", "Лайки"]}
        items={newChapters}
        href={`/book/${bookId}/chapter/`}
        keys={["name", "chapterStatus", "updatedAt", "views", "likes"]}
      />
    </div>
  );
};
