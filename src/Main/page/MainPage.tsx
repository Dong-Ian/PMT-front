import moment from "moment";
import "moment/locale/ko";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, tokenState } from "../../Utils/Atom/Atom";
import styles from "../style/main.module.css";
import GetChattingRoomFunction from "../function/GetChattingRoomFunction";
import { ChattingRoomListInterface } from "../type/MainType";
import NavigationBar from "../../Utils/\bcomponent/NavigationBar";
import GetRefreshTokenFunction from "../../Utils/function/GetRefreshTokenFunction";

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
  const [token, setToken] = useRecoilState(tokenState);
  const mode = useRecoilValue(modeState);

  const [chatRoomList, setChatRoomList] = useState<
    ChattingRoomListInterface[] | null
  >(null);

  // 채팅방 리스트를 가져오는 함수
  async function fetchChattingRooms() {
    const result = await GetChattingRoomFunction({ token });
    if (result.code === "0000" && result.chatRoomData) {
      setChatRoomList(result.chatRoomData);
      return true;
    }
    if (result.code === "CRL101") {
      return false; // 토큰 만료
    }
    return null; // 기타 오류
  }

  // 토큰을 갱신하고 다시 요청하는 함수
  async function handleTokenExpiration() {
    const result = await GetRefreshTokenFunction({ token });
    if (result.code === "0000") {
      setToken({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      const retryResult = await fetchChattingRooms(); // 토큰 갱신 후 재요청
      if (retryResult) return;
    }
    alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
    navigate("/login");
  }

  // 채팅방 정보를 가져오는 메인 함수
  async function GetChattingRoom() {
    const success = await fetchChattingRooms();
    if (success === false) {
      await handleTokenExpiration();
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
                    <div className={styles.image}></div>
                    <div className={styles.inner_contents}>
                      <p className={styles.room_name}>{room.chatRoomName}</p>
                      <p className={styles.preview}>
                        미리보기 대화입니다. 미리보기 대화입니다.
                      </p>
                    </div>
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
