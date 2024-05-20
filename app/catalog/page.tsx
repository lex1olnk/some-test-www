import { Filter } from "@/components/Catalog/Filter";
import { Title } from "@/components/ui/Title";
import db from "@/lib/prisma";

const getFilterData = async () => {
  const genres = await db.genre.findMany();
  const tags = await db.tag.findMany();
  const fandoms = await db.fandom.findMany();

  return { genres, tags, fandoms };
};

const getBooksByFilter = async () => {
  return {};
};

export default async function Page({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const { genres, fandoms, tags } = await getFilterData();

  const books = await getBooksByFilter();
  return (
    <div className="flex flex-row text-black max-w-7xl mx-auto">
      <div className="flex-1">
        <Title>Каталог</Title>
        <div>SearchInput</div>
      </div>
      <Filter genres={genres} fandoms={fandoms} tags={tags} />
    </div>
  );
}
