import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { modeState, tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/login.module.css";

import LoginFunction from "../function/LoginFunction";

import Email from "../component/Email";
import Password from "../component/Password";
import ModeButton from "../../Utils/\bcomponent/ModeButton";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const mode = useRecoilValue(modeState);
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
    <div className={`container ${mode ? "light_container" : "dark_container"}`}>
      <ModeButton />
      <p
        className={`${styles.title} ${
          mode ? styles.light_title : styles.dark_title
        }`}
      >
        talk
      </p>

      <form className={styles.login_box} method="post" onSubmit={Login}>
        <Email value={email} onChange={setEmail} />
        <Password value={password} onChange={setPassword} />
        <input
          className={`${styles.login_button} ${
            mode ? styles.light_login_button : styles.dark_login_button
          }`}
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
};

export default LoginPage;
