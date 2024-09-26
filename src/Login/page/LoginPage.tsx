import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import LoginFunction from "../function/LoginFunction";

import Email from "../component/Email";
import Password from "../component/Password";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const setToken = useSetRecoilState(tokenState);

  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("아이디/비밀번호를 입력해주세요.");
      return;
    }

    const result = await LoginFunction({ email, password });

    if (result.code === "0000") {
      setToken({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form method="post" onSubmit={Login}>
        <Email value={email} onChange={setEmail} />
        <Password value={password} onChange={setPassword} />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default LoginPage;
