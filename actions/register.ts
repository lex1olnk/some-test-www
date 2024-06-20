export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`api/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};
