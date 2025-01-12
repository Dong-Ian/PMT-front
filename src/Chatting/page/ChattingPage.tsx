import React, { useEffect, useState, useRef } from "react";
import styles from "../style/chatting.module.css";
import { ScrollArea } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../../Utils/Atom/Atom";
import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ChattingPageProps {
  userName: string;
  chatRoomSeq: number;
  setIsMessageTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChattingPage: React.FC<ChattingPageProps> = ({
  userName,
  chatRoomSeq,
  setIsMessageTabOpen,
}: ChattingPageProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const websocket = useRef<WebSocket | null>(null);
  const token = useRecoilValue(tokenState);
  const stompClient = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_API}/chat`);
    const client = Stomp.Stomp.over(socket);

    client.connect(
      {
        Authorization: `Bearer ${token.accessToken}`,
      },
      () => {
        console.log("WebSocket connection established");

        client.subscribe(`/topic/chatRoom/${chatRoomSeq}`, (message) => {
          const newMessage = message.body;
          setMessages((prev) => [...prev, newMessage]);
        });
      },
      (error: Stomp.Message) => {
        console.error("WebSocket error:", error);
      }
    );

    stompClient.current = client;

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate().then(() => {
          console.log("WebSocket connection closed");
        });
      }
    };
  }, [chatRoomSeq]);
  const sendMessage = () => {
    if (websocket.current && inputMessage.trim()) {
      const messageData = {
        chatRoomSeq,
        userName,
        message: inputMessage,
      };

      console.log(messageData);
      websocket.current.send(JSON.stringify(messageData));
      setInputMessage("");
    }
  };

  return (
    <div className={styles.chatting_box}>
      <p onClick={() => setIsMessageTabOpen(false)}>x</p>
      <ScrollArea style={{ height: "calc(100% - 80px)", overflowY: "auto" }}>
        <div className={styles.messages}>
          {messages.map((msg, index) => {
            const message = JSON.parse(msg);
            return (
              <div key={index} className={styles.message}>
                <p>{message.userName}</p>
                <p>{message.message}</p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className={styles.input_box}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.send_button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChattingPage;
