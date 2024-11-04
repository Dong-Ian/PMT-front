import { TokenProps } from "../../Utils/type/UtilType";

export interface CreateChattingRoomFunctionProps extends TokenProps {
  chatRoomName: string;
  userIdList: string[];
}

export interface ChattingRoomListInterface {
  chatRoomName: string;
  chatRoomSeq: number;
  chatRoomType: number;
  modDate: string;
  regDate: string;
}
