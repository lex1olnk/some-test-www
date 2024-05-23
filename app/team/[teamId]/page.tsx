import { TeamDescription } from "@/components/Team/TeamDescription";
import { TeamDescriptionCard } from "@/components/Team/TeamDescriptionCard";
import { Navigation } from "@/components/ui/Navigation";
import db from "@/lib/prisma";
import { notFound } from "next/navigation";

const getBookInformation = async (teamId: string) => {
  const teamInfo = await db.team.findUnique({
    where: {
      id: Number(teamId),
    },
  });
  return teamInfo;
};

export default async function Page({
  params,
}: {
  params: {
    teamId: string;
  };
}) {
  const team = await getBookInformation(params.teamId);
  if (!team) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <TeamDescriptionCard team={team} />
      <Navigation
        className=""
        navs={[
          {
            content: <TeamDescription team={team} key={1} />,
            value: "Описание",
          },
          { content: <div>asd</div>, value: "Участники" },
        ]}
      >
        asdasd
      </Navigation>
    </div>
  );
}
