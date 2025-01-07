import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "../Atom/Atom";
import GetProjectListFunction from "../../Main/function/GetProjectListFunction";

const ValidatePage: React.FC = () => {
  const navigation = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const validUser = async () => {
    if (!token) {
      navigation("/login", { replace: true });
      return;
    }

    const result = await GetProjectListFunction({
      token,
    });

    if (result.code === "0000") {
      navigation("/main", { replace: true });
      return;
    }

    setToken({ accessToken: "", refreshToken: "" });
    alert("로그인 정보가 유효하지 않습니다.\n다시 로그인 해주세요.");
    navigation("/login", { replace: true });
  };

  useEffect(() => {
    validUser();
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default ValidatePage;
