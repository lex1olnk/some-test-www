import db from "@/lib/prisma";

const getGenres = async () => {
  const genres = await db.genre.findMany({
    take: 10,
  });

  return genres;
};

export const Genres = async () => {
  const genres = await getGenres();

  return (
    <div className="p-1 w-full bg-white flex flex-wrap">
      {genres.map((genre) => (
        <div
          key={genre.name + genre.id}
          className="m-1 max-w-full py-1 px-4 h-15 bg-primary"
        >
          {genre.name}
        </div>
      ))}
      {genres.map((genre) => (
        <div
          key={genre.name + genre.id}
          className="m-1 max-w-full py-1 px-4 h-15 bg-primary"
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};
