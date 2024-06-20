import { DetailedHTMLProps, HTMLAttributes } from "react";

interface inputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  input?: string;
  helper?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
}

export const Input = ({
  title = "",
  input = "",
  helper = "",
  onChange,
  type = "text",
  name,
  className,
}: inputProps) => {
  return (
    <div className={className}>
      {title && <p className="mb-1">{title}</p>}
      <input
        className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={onChange}
        type={type}
        name={name}
        placeholder={input}
      />
    </div>
  );
};
