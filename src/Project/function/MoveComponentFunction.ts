import { ComponentProps } from "../type/Project.type";

export default async function MoveComponentFunction({
  token,
  item,
}: ComponentProps) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/component/update/move`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        projectSeq: item.projectSeq,
        componentSeq: item.componentSeq,
        componentX: item.x,
        componentY: item.y,
        componentWidth: item.w,
        componentHeight: item.h,
      }),
    }
  );

  const res = await result.json();
  console.log("move component function:", res);
  return res;
}
