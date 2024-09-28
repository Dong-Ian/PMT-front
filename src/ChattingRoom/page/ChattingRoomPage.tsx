import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState, userIdState } from "../../Utils/Atom/Atom";

import GetChatDataFunction from "../function/GetChatDataFunction";

const ChattingRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { chatRoomSeq } = useParams();

  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");

  async function GetChatData() {
    const chatRoomSeqNumber = Number(chatRoomSeq);

    if (!isNaN(chatRoomSeqNumber)) {
      const result = await GetChatDataFunction({
        token,
        chatRoomSeq: chatRoomSeqNumber,
      });

      return;
    }

    alert("유효하지 않은 채팅방");
    navigate("/");
    return;
  }

  function initializeWebSocket() {
    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET}/chat?userId=01920469-d6a3-7968-8acf-cd04d520baee`
    );

    // 연결 성공 시
    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    // 서버에서 메시지를 받을 때
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("서버로부터 메시지 수신: ", data);
    };

    // 연결 종료 시
    socket.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
    };

    // 에러 발생 시
    socket.onerror = (error) => {
      console.error("WebSocket 오류 발생: ", error);
    };

    // WebSocket 상태를 업데이트
    setWs(socket);
  }

  function handleMessage(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    setMessage(value);
  }

  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          chatRoomSeq: chatRoomSeq,
          message: message,
        })
      );
      console.log("메시지 전송: ", message);
      setMessage(""); // 메시지를 전송한 후 입력 필드를 비웁니다.
    } else {
      console.log("WebSocket 연결이 열려있지 않습니다.");
    }
  }

  useEffect(() => {
    GetChatData();
    initializeWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomSeq, token]);

  return (
    <div>
      <p>ChattingRoomPage: {chatRoomSeq}</p>
      <input
        onChange={handleMessage}
        type="text"
        placeholder="message"
        name="message"
        value={message}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChattingRoomPage;
