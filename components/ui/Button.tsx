import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  handleSubmit?: () => void;
  type?: "button";
}

export const Button = ({
  children,
  className,
  handleSubmit,
  type,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "py-3 w-[230px] bg-primary text-white text-center",
        className
      )}
      onClick={handleSubmit}
      type={type || "submit"}
    >
      {children}
    </button>
  );
};
