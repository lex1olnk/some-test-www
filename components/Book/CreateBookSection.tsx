import db from "@/lib/prisma";
import { Suspense, useState } from "react";
import { BookHead } from "@/components/Book/BookHead";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Chapters } from "@/components/Book/Chapters";
import { BookDescription } from "@/components/Book/BookDescription";
import { Input } from "@/components/ui/Input";

const postBook = async (bookInfo: any) => {
  return;
};

export default async function CreateBookSection({
  authors, genres, fandoms, tags, 
}: {
  
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    originalName: "",
    originalLink: "",
    src: "",
    year: 0,
    author: {},
    language: {},
    genres: [],
    tags: [],
    fandoms: [],
    html: "",
    img: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeText = (value: string) =>
    setFormValues((prevState) => ({ ...prevState, ["html"]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = postBook({ ...formValues });
  };
  return (
    <div className="bg-slate-50">
      <div className="flex flex-row w-full justify-center">
        <div className="shadow-md w-[308px] h-[628px] rounded-md mx-2 bg-white flex flex-col">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Лого</span>
          </div>
          <div className="px-8 mt-8 [&>div]:my-1"></div>
        </div>
        <div className="w-[685px] h-[628px] bg-white shadow-md">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">
              Информация о тайтле
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-6 mt-4 [&>div]:py-1">
              <Input
                title="Название тайтла"
                name="name"
                onChange={handleChange}
              />
              <Input
                title="Оригинальное название"
                name="origName"
                onChange={handleChange}
              />
              <Input
                title="Ссылка на первоисточник"
                name="src"
                onChange={handleChange}
              />
              {/* <SelectedInput
                label='Жанры'
                name='genres'
                type='genre'
                setSelectedOption={handleChange}
              />
              <SelectedInput
                label='Теги'
                name='tags'
                type='tag'
                input='Теги'
                setSelectedOption={handleChange}
              />
              <SelectedInput
                label='Фандомы'
                name='tags'
                type='fandom'
                setSelectedOption={handleChange}
              /> */}
            </div>
          </form>
        </div>
      </div>
      <div className="block mx-auto w-[996px] mt-4">
        <div className=" bg-slate-200 shadow-md h-[52px] flex">
          <span className="text-xl text-left px-8 my-auto">Описание</span>
        </div>
      </div>
      <button
        type="submit"
        className="block text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Default
      </button>
    </div>
  );
}
