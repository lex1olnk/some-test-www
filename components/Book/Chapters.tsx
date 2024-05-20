import { Chapter } from "@prisma/client";
import { Table } from "../ui/Table";

export const Chapters = ({ chapters }: { chapters: Chapter[] }) => {
  const newChapters = chapters.map((chapter) => {
    const date = new Date(chapter.updatedAt);
    return { ...chapter, updatedAt: date.toDateString() };
  });

  return (
    <div>
      <div></div>
      <Table
        rows={["Название", "Статус", "Обновлено", "Просмотров", "Лайки"]}
        items={newChapters}
        keys={["name", "chapterStatus", "updatedAt", "views", "likes"]}
      />
    </div>
  );
};
