export const Input = (props) => {
  const {
    title = null,
    input = null,
    helper = null,
    onChange,
    type = "text",
    name,
    className,
  } = props;
  return (
    <div className={className}>
      {title}
      <input
        className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={onChange}
        type={type}
        name={name}
        placeholder={input}
      />
    </div>
  );
};
