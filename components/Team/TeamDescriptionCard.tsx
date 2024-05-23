import { Team } from "@prisma/client";
import { Button } from "../ui/Button";

export const TeamDescriptionCard = ({ team }: { team: Team }) => {
  return (
    <div className="bg-white text-black h-full">
      <div className=" w-[1280px] mx-auto z-10 h-[147px] bg-slate-600 absolute">
        background
      </div>

      <div className="relative  z-20 p-8">
        <div className="flex flex-row">
          <div className="bg-slate-300 h-[232px] w-[232px] rounded-full ">
            img
          </div>
          <div className="ml-8">
            <div>{team.name}</div>
            <div className="flex flex-row">
              <div>{team.adminId}</div>
              <div>{team.likes}</div>
              <div>Работ</div>
              <div>Подписчиков</div>
              <div>Глав в месяц</div>
            </div>
            <Button>Следить за командой</Button>
          </div>
        </div>

        <div className="flex-grow">translator</div>
      </div>
    </div>
  );
};
