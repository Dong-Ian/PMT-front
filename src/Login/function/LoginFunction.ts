import { LoginFunctionProps } from "../type/LoginType";

export default async function LoginFunction({
  email,
  password,
}: LoginFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const res = await result.json();
  console.log(res);
  return res;
}
