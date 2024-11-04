import React from "react";
import { useParams } from "react-router-dom";

const ChattingPage: React.FC = () => {
  const { chatRoomSeq } = useParams();
  return <div>chatting</div>;
};

export default ChattingPage;
