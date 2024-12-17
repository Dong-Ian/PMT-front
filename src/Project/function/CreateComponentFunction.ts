import { ComponentProps } from "../type/Project.type";

export default async function CreateComponentFunction({
  token,
  item,
}: ComponentProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/component/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      projectSeq: item.projectSeq,
      componentName: item.i,
      componentData: item.data,
      componentX: item.x,
      componentY: item.y,
      componentWidth: item.w,
      componentHeight: item.h,
      componentType: item.type,
    }),
  });

  const res = await result.json();
  console.log(res);
  return res;
}
