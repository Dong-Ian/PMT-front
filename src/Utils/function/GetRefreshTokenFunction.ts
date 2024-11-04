import { TokenProps } from "../type/UtilType";

export default async function GetRefreshTokenFunction({ token }: TokenProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/token/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.refreshToken}`,
    },
    body: JSON.stringify({
      refreshToken: token.refreshToken,
    }),
  });

  const res = await result.json();
  console.log("get refresh token function:", res);
  return res;
}
