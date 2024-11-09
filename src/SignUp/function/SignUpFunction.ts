import { SignUpFunctionProps } from "../type/SignUp.type";

export default async function SignUpFunction({
  name,
  email,
  password,
}: SignUpFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  const res = await result.json();
  console.log("signup function result: %o", res);

  return res;
}
