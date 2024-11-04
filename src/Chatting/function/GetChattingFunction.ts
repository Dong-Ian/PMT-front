import { TokenProps } from "../../Utils/type/UtilType";

interface GetChattingFunctionProps extends TokenProps {
  chatRoomSeq: number;
}
export default async function GetChattingFunction({
  chatRoomSeq,
  token,
}: GetChattingFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/chat/data`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token.accessToken}` },
    body: JSON.stringify({
      chatRoomSeq: chatRoomSeq,
    }),
  });

  const res = await result.json();
  console.log(res);
  return res;
}
