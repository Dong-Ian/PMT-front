import moment from "moment";
import "moment/locale/ko";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { modeState, tokenState } from "../../Utils/Atom/Atom";
import styles from "../style/main.module.css";
import GetChattingRoomFunction from "../function/GetChattingRoomFunction";
import { ChattingRoomListInterface } from "../type/MainType";
import NavigationBar from "../../Utils/\bcomponent/NavigationBar";

const DateRender = ({ modDate }: { modDate: string }) => {
  const now = moment();
  const mod = moment(modDate).add(9, "hour");

  const getDisplayText = () => {
    const daydiff = now.diff(mod, "days");
    if (daydiff >= 1) return mod.format("YYYY-MM-DD");

    return mod.format("A h:mm");
  };

  return (
    <div>
      <p>{getDisplayText()}</p>
    </div>
  );
};

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
          <p className={styles.title}>채팅</p>
          {chatRoomList.map(
            (room: ChattingRoomListInterface, index: number) => {
              return (
                <div
                  className={styles.chatting_room}
                  onClick={() => {
                    navigate(`/chatting/${room.chatRoomSeq}`);
                  }}
                  key={index}
                >
                  <div className={styles.contents}>
                    <p>{room.chatRoomName}</p>
                  </div>
                  <div className={styles.information}>
                    <DateRender modDate={room.modDate} />
                  </div>
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
