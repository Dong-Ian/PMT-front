import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { modeState, tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/main.module.css";

import GetChattingRoomFunction from "../function/GetChattingRoomFunction";
import { ChattingRoomListInterface } from "../type/MainType";

import NavigationBar from "../../Utils/\bcomponent/NavigationBar";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const mode = useRecoilValue(modeState);

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

  useEffect(() => {
    GetChattingRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chatRoomList) {
    return (
      <div
        className={`container ${mode ? "light_container" : "dark_container"}`}
      >
        <NavigationBar />
        <div className={styles.main_container}>
          <p>MainPage</p>
          {chatRoomList.map(
            (room: ChattingRoomListInterface, index: number) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/chatting/${room.chatRoomSeq}`);
                  }}
                  key={index}
                >
                  <p>{room.chatRoomName}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }

  return <div>chatting</div>;
};

export default MainPage;
