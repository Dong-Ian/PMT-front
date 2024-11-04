import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GetChattingFunction from "../function/GetChattingFunction";
import { useRecoilState } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

const ChattingPage: React.FC = () => {
  const { chatRoomSeq } = useParams();
  const [token, seToken] = useRecoilState(tokenState);

  async function GetChatting() {
    if (chatRoomSeq) {
      const result = await GetChattingFunction({
        chatRoomSeq: parseInt(chatRoomSeq),
        token,
      });
      console.log(result);
    }
  }

  useEffect(() => {
    GetChatting();
  }, []);
  return <div>chatting</div>;
};

export default ChattingPage;
