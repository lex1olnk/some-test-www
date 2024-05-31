import db from "@/lib/prisma";

const getStaticServerData = async () => {
  const authors = await db.author.findMany({});
  const genres = await db.genre.findMany({});
  const fandoms = await db.genre.findMany({});
};

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div className="bg-slate-50">asd</div>;
}
