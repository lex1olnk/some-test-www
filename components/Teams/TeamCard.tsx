import { Team } from "@prisma/client";
import styles from "./styles.module.css";
import { hideText } from "@/helpers";
import Link from "next/link";

export const TeamCard = ({ team }: { team: Team }) => {
  return (
    <div className="flex flex-col bg-white my-2 mr-2 sm:flex-row">
      <div className="flex-1">
        <div className="flex flex-row">
          <div>icon</div>
          <div>
            <Link href={`/team/${team.id}`}>{team.name}</Link>
            <div className="flex flex-row">
              <div></div>
              <div>{team.likes}</div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          {hideText(
            `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.`,
            250
          )}
        </div>
      </div>
      <div className={styles.images}>
        <div>img1</div>
        <div>img1</div>
        <div>img1</div>
      </div>
    </div>
  );
};
