import db from "@/lib/prisma";

const getTeams = async () => {
  const teams = await db.team.findMany({
    orderBy: {
      likes: "asc",
    },
    take: 10,
  });
  return teams;
};

export default async function Page({}) {
  const teams = await getTeams();

  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}></div>
      ))}
    </div>
  );
}
