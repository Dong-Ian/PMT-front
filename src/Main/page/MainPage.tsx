import React, { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import GetChattingRoomFunction from "../function/GetChattingRoomFunction";
import CreateChattingRoomFunction from "../function/CreateChattingRoomFunction";

const MainPage: React.FC = () => {
  const token = useRecoilValue(tokenState);

  async function GetChattingRoom() {
    const result = await GetChattingRoomFunction({ token: token });
  }

  async function CreateChattingRoom() {
    const result = await CreateChattingRoomFunction({
      token: token,
      chatRoomName: "ex",
      userIdList: [],
    });
  }

  useEffect(() => {
    GetChattingRoom();
  }, []);

  return (
    <div>
      <p>MainPage</p>
      <button onClick={CreateChattingRoom}>create chat</button>
    </div>
  );
};

export default MainPage;
