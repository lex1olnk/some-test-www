import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  showRating?: boolean;
  rating?: number;
  width?: number;
}
const hideText = (text: string, maxlimit: number) => {
  return text.length > maxlimit
    ? text.substring(0, maxlimit - 3) + "..."
    : text;
};

export const Card = ({
  title,
  showRating = false,
  rating,
  width,
}: CardProps) => {
  const text = title && hideText(title, 22);

  return (
    <div className=" h-full aspect-[0.69318181818] py-2 px-1 first:ml-1 last:mr-1">
      {text && <div className="bg-slate-300 h-full">{text}</div>}
    </div>
  );
};
