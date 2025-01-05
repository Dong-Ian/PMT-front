import React, { useEffect, useState, useRef } from "react";
import styles from "../style/chatting.module.css";
import { ScrollArea } from "@mantine/core";

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

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET}/test/chat/send`
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.current = ws;

    return () => {
      ws.close();
    };
  }, []);

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
