import { ComponentProps } from "../type/Project.type";

export default async function CreateComponentFunction(props: ComponentProps) {
  const {
    token,
    projectSeq,
    componentName,
    componentData,
    componentX,
    componentY,
    componentWidth,
    componentHeight,
    componentType,
  } = props;

  const result = await fetch(`${process.env.REACT_APP_API}/component/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      projectSeq,
      componentName,
      componentData,
      componentX,
      componentY,
      componentWidth,
      componentHeight,
      componentType,
    }),
  });

  const res = await result.json();

  return res;
}
