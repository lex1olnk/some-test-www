export const News = () => {
  const someInteresting = [
    {
      date: "29.05.2024",
      text: "Технические неполадки",
      author: "user1",
    },
    {
      date: "22.05.2024",
      text: "Технические неполадки",
      author: "user1",
    },
    {
      date: "21.05.2024",
      text: "Технические неполадки",
      author: "user1",
    },
  ];

  return (
    <div className="w-full bg-white">
      {someInteresting.map((a) => (
        <div key={a.date}>
          <p>{a.text}</p>
          <div>
            <p>{a.date}</p>
            <p>{a.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
