import { TeamCard } from "@/components/Teams/TeamCard";
import { Title } from "@/components/ui/Title";
import db from "@/lib/prisma";

const getTeams = async () => {
  const teams = await db.team.findMany({
    include: {
      User: {
        select: {
          _count: {
            select: {
              booksTranslator: {},
            },
          },
        },
      },
    },
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
    <div className="text-black max-w-7xl mx-auto">
      <div>Команды</div>
      <div className="flex flex-row">
        <div className="flex-1">
          <div>input</div>
          <div>
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
        <div className="w-[308px] bg-white hidden lg:block h-full">
          <Title>Топы по работам</Title>
          <div>
            <div>Команда</div>
            <div>Команда</div>
            <div>Команда</div>
          </div>
        </div>
      </div>
    </div>
  );
}
