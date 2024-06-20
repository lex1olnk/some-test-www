import axios from "axios";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    `api/auth/register`,
    JSON.stringify({ name, email, password }),
    { headers: { "Content-Type": "application/json" } }
  );
};
