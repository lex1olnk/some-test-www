import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Button = ({ children }: ButtonProps) => {
  return (
    <div className="py-3 w-[230px] bg-primary text-white text-center">
      {children}
    </div>
  );
};
