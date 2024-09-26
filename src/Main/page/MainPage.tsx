import React, { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import GetChattingRoomFunction from "../function/GetChattingRoomFunction";

const MainPage: React.FC = () => {
  const token = useRecoilValue(tokenState);

  async function GetChattingRoom() {
    const result = await GetChattingRoomFunction({ token: token });
  }

  useEffect(() => {
    GetChattingRoom();
  }, []);

  return (
    <div>
      <p>MainPage</p>
    </div>
  );
};

export default MainPage;
