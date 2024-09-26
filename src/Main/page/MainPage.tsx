import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import GetChattingRoomFunction from "../function/GetChattingRoomFunction";
import CreateChattingRoomFunction from "../function/CreateChattingRoomFunction";

import { ChattingRoomListInterface } from "../type/MainType";

const MainPage: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const [chatRoomList, setChatRoomList] = useState<
    ChattingRoomListInterface[] | null
  >(null);

  async function GetChattingRoom() {
    const result = await GetChattingRoomFunction({ token: token });
    if (result.code === "0000" && result.chatRoomData) {
      setChatRoomList(result.chatRoomData);
      return;
    }
  }

  async function CreateChattingRoom() {
    const result = await CreateChattingRoomFunction({
      token: token,
      chatRoomName: "ex",
      userIdList: [],
    });

    if (result.code === "0000") {
      alert("채팅방 생성 성공");
      return;
    }

    alert("체팅방 생성 실패");
    return;
  }

  useEffect(() => {
    GetChattingRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chatRoomList) {
    return (
      <div>
        <p>MainPage</p>
        {chatRoomList.map((room: ChattingRoomListInterface, index: number) => {
          return (
            <div key={index}>
              <p>{room.chatRoomName}</p>
            </div>
          );
        })}
        <button onClick={CreateChattingRoom}>create chat</button>
      </div>
    );
  }

  return <div>chatting</div>;
};

export default MainPage;
