import { ComponentProps } from "../type/Project.type";

export default async function EditComponentDataFunction({
  token,
  item,
}: ComponentProps) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/component/update/data`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        projectSeq: item.projectSeq,
        componentSeq: item.componentSeq,
        componentData: item.data,
      }),
    }
  );

  const res = await result.json();
  console.log("edit component data functoin:", res);
  return res;
}
