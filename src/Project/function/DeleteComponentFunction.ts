import { ComponentProps } from "../type/Project.type";

export default async function DeleteComponentFunction({
  token,
  item,
}: ComponentProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/component/delete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      projectSeq: item.projectSeq,
      componentSeq: item.componentSeq,
    }),
  });

  const res = await result.json();
  console.log("delete component function", res);
  return res;
}
