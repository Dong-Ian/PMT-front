export interface TokenProps {
  token: { accessToken: string; refreshToken: string };
}

export interface CreateChattingRoomFunctionProps {
  token: { accessToken: string; refreshToken: string };
  chatRoomName: string;
  userIdList: string[];
}
