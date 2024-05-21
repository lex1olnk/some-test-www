"use client";

import { Fandom, Genre, Tag } from "@prisma/client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MultipleSelect } from "../ui/MultipleSelect";

const statusArray = [
  {
    value: "option1",
    text: "переводится",
  },
  {
    value: "option2",
    text: "заброшен",
  },
  {
    value: "option3",
    text: "заморожен",
  },
  {
    value: "option4",
    text: "заморожен",
  },
];

const ageArray = [
  {
    value: "all",
    text: "для всех",
  },
  {
    value: "+16",
    text: "+16",
  },
  {
    value: "+18",
    text: "+18",
  },
];

export const Filter = ({
  genres,
  fandoms,
  tags,
}: {
  genres: Genre[];
  fandoms: Fandom[];
  tags: Tag[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState({
    // tags: [],
    // genres: [],
    // fandoms: [],
    // type: "",
    statusTranslate: "",
    age: "all",
    // yearBefore: "",
    // yearAfter: "",
    // chaptersBefore: "",
    // chaptersAfter: "",
    // ratingBefore: "",
    // ratingAfter: "",
  });

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onMultipleChange = (name: string, values: any) => {
    setQuery((prevState) => ({
      ...prevState,
      [name]: [...values],
    }));
  };
  console.log(query);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSubmit = () => {
    console.log(query);
    router.push(pathname + "?" + createQueryString("sort", "asc"));
  };

  return (
    <form className="bg-white w-[307px] rounded-md p-4 list-none">
      <span className="text-xl">Фильтры</span>
      <div className="mt-2">
        <p className="py-2">Типы</p>
        <input
          className="duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full"
          placeholder="SearchPanel"
        />
      </div>
      <div>
        <p className="py-2">Жанры</p>
        <MultipleSelect
          queryKey={"genres"}
          options={genres}
          valueKey={"name"}
          onMultipleChange={onMultipleChange}
        />
      </div>
      <div>
        <p className="py-2">Теги</p>
        <input
          className="duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full"
          placeholder="SearchPanel"
        />
      </div>
      <div>
        <p className="py-2">Фандомы</p>
        <MultipleSelect
          queryKey={"fandoms"}
          options={fandoms}
          valueKey={"name"}
          onMultipleChange={onMultipleChange}
        />
      </div>
      <div>
        <p>Статус перевода</p>
        <div className="flex flex-wrap">
          {statusArray.map((item) => (
            <div className="min-w-[50%]" key={item.value}>
              <label>
                <input
                  name="statusTranslate"
                  type="radio"
                  value={item.value}
                  checked={query.statusTranslate === item.value}
                  onChange={onOptionChange}
                />
                {item.text}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>Для взрослых</p>
        <div className="flex flex-wrap">
          {ageArray.map((item) => (
            <div className="min-w-[3 0%]" key={item.value}>
              <label>
                <input
                  name="age"
                  type="radio"
                  value={item.value}
                  checked={query.age === item.value}
                  onChange={onOptionChange}
                />
                {item.text}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="py-2">Год выпуска</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-5/12">
            От
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md " />
          </div>
          <div className="flex flex-col w-5/12">
            До
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md" />
          </div>
        </div>
      </div>
      <div>
        <p className="py-2">Глав</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-5/12">
            От
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md " />
          </div>
          <div className="flex flex-col w-5/12">
            До
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md" />
          </div>
        </div>
      </div>
      <div>
        <p className="py-2">Рейтинг</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-5/12">
            От
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md " />
          </div>
          <div className="flex flex-col w-5/12">
            До
            <input className="outline-slate-300 border-2 px-2 py-1 rounded-md" />
          </div>
        </div>
      </div>
      <Link
        href={{
          pathname,
          query: query,
        }}
      >
        DESC
      </Link>
    </form>
  );
};
