import { CreateChattingRoomFunctionProps } from "../type/MainType";

export default async function CreateChattingRoomFunction({
  token,
  chatRoomName,
  userIdList,
}: CreateChattingRoomFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/chat/room`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      chatRoomName: "hi",
      userIdList: ["minijae011030@gmail.com"],
      chatRoomType: 1,
    }),
  });

  const res = await result.json();

  return res;
}
