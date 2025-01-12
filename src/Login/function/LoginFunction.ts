import { LoginFunctionProps } from "../type/LoginType";

export default async function LoginFunction({
  accessToken,
  email,
  name,
  image,
}: LoginFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/user/google/oauth`, {
    method: "POST",
    body: JSON.stringify({
      accessToken: accessToken,
      email: email,
      name: name,
      image: image,
      signonType: "GOOGLE",
    }),
  });

  const res = await result.json();

  return res;
}
