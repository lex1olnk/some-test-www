import { useState } from "react";
import { Input } from "../ui/Input";

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

  return (
    <div>
      <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
      <div>
        <Input
          title={"Название"}
          name={"name"}
          onChange={handleChange}
          input={"Название"}
        />
        <Input
          title={"Почта"}
          name={"email"}
          onChange={handleChange}
          input={"Почта"}
        />
        <Input
          title={"Пароль"}
          name={"password"}
          onChange={handleChange}
          input={"Пароль"}
        />
      </div>
    </div>
  );
};
