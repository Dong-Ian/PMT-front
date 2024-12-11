import { TokenProps } from "../../Utils/type/UtilType";

export default async function GetProjectListFunction({ token }: TokenProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/project/list`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const res = await result.json();
  console.log(res);

  return res;
}
