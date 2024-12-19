import { ComponentProps } from "../type/Project.type";

export default async function EditComponentDataFunction({
  token,
  item,
}: ComponentProps) {
  console.log(item.data);
  const result = await fetch(
    `${process.env.REACT_APP_API}/component/update/data`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        projectSeq: item.projectSeq,
        componentData: item.data,
      }),
    }
  );

  const res = await result.json();
  console.log("edit component data functoin:", res);
  return res;
}
