import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import GetChatDataFunction from "../function/GetChatDataFunction";

const ChattingRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { chatRoomSeq } = useParams();
  const token = useRecoilValue(tokenState);

  async function GetChatData() {
    const chatRoomSeqNumber = Number(chatRoomSeq);

    if (!isNaN(chatRoomSeqNumber)) {
      const result = await GetChatDataFunction({
        token,
        chatRoomSeq: chatRoomSeqNumber,
      });
      console.log(result);

      return;
    }

    alert("유효하지 않은 채팅방");
    navigate("/");
    return;
  }

  function initializeWebSocket(chatRoomSeq: number, token: string) {
    const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET}`);

    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("메시지 수신: ", data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket 오류 발생: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
      socket.close();
    };
  }

  useEffect(() => {
    GetChatData();

    const chatRoomSeqNumber = Number(chatRoomSeq);
    if (!isNaN(chatRoomSeqNumber)) {
      // WebSocket 연결을 초기화
      const cleanUpWebSocket = initializeWebSocket(chatRoomSeqNumber, token);

      // 컴포넌트 언마운트 시 WebSocket 정리
      return () => {
        if (cleanUpWebSocket) {
          cleanUpWebSocket();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomSeq, token]);

  return (
    <div>
      <p>ChattingRoomPage: {chatRoomSeq}</p>
    </div>
  );
};

export default ChattingRoomPage;
