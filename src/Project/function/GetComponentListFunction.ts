import { GetComponentListFunctionProps } from "../type/Project.type";

export default async function GetComponentListFunction({
  token,
  projectSeq,
}: GetComponentListFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/component/list`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      projectSeq: projectSeq,
    }),
  });

  const res = await result.json();
  console.log(res);
  return res;
}
