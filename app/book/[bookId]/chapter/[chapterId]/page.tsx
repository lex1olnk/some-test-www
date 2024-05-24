import Discussion from "@/components/Discussion/Discussion";
import db from "@/lib/prisma";
import { notFound } from "next/navigation";

const getChapter = async (chapterId: string) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: Number(chapterId),
    },
  });

  return chapter;
};

export default async function Page({
  params,
}: {
  params: {
    chapterId: string;
  };
}) {
  const chapter = await getChapter(params.chapterId);

  if (!chapter) notFound();

  return (
    <div className="max-w-7xl mx-auto">
      <div>{chapter.content}</div>
      <Discussion id={chapter.discussionId} />
    </div>
  );
}
