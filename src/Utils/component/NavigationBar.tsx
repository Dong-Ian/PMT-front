import React from "react";
import { useRecoilValue } from "recoil";
import { modeState, tokenState } from "../Atom/Atom";

import styles from "../style/component.module.css";
import ModeButton from "./ModeButton";
import CreateChattingRoomFunction from "../../Main/function/CreateChattingRoomFunction";

const NavigationBar: React.FC = () => {
  const mode = useRecoilValue(modeState);
  const token = useRecoilValue(tokenState);

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

  return (
    <div
      className={`${styles.navigationbar} ${
        mode ? styles.light_navigationbar : styles.dark_navigationbar
      }`}
    >
      <ModeButton />
      <button onClick={CreateChattingRoom}>create chat</button>
    </div>
  );
};

export default NavigationBar;
