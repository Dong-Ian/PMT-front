import { GetChatDataFunctionProps } from "../type/ChattingRoomType";

export default async function GetChatDataFunction({
  token,
  chatRoomSeq,
}: GetChatDataFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/chat/data`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      chatRoomSeq: chatRoomSeq,
    }),
  });

  const res = await result.json();
  console.log(res);
  return res;
}
