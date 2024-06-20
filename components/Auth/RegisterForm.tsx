"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { register } from "@/actions/register";

interface Form {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [formValues, setFormValues] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, password } = formValues;

    register(name, email, password);
  };

  return (
    <form
      className="w-[618px] bg-white flex flex-col items-center mt-10 p-10 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="w-full *:my-4">
        <Input
          title="Название"
          name="name"
          onChange={handleChange}
          input="Название"
        />
        <Input
          title="Почта"
          name="email"
          onChange={handleChange}
          input="Почта"
        />
        <Input
          title="Пароль"
          name="password"
          onChange={handleChange}
          input="Пароль"
          type="password"
        />
      </div>
      <a className="my-1">Ознакомиться с правилами сайта</a>
      <div className="flex flex-row my-1">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 mr-2 my-auto rounded-full text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
        <span>
          Я принимаю положения и условия и политику конфиденциальности
        </span>
      </div>

      <Button className="rounded-md my-1">Зарегистрироваться</Button>
    </form>
  );
};
