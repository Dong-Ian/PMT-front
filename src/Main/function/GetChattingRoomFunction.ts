import { TokenProps } from "../type/MainType";

export default async function GetChattingRoomFunction({ token }: TokenProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/chat/room`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const res = await result.json();

  return res;
}
