import { DetailedHTMLProps, HTMLAttributes } from "react";

interface TitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Title = ({ children }: TitleProps) => {
  return (
    <div className="block h-9 bg-primary w-fit mb-4">
      <div className="flex bg-white ml-6 h-9 px-6">
        <div className="my-auto">{children}</div>
      </div>
    </div>
  );
};
