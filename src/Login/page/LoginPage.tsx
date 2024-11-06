import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/login.module.css";

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
      navigate("/main");
      return;
    }

    alert(
      "등록되지 않은 아이디이거나\n아이디 또는 비밀번호를 잘못 입력했습니다."
    );
    return;
  };

  return (
    <div>
      <p className={styles.title}>PMT</p>

      <form className={styles.login_box} method="post" onSubmit={Login}>
        <Email value={email} onChange={setEmail} />
        <Password value={password} onChange={setPassword} />
        <input className={styles.login_button} type="submit" value="로그인" />
        <button
          className={styles.signup_button}
          onClick={() => navigate("/signup")}
        >
          회원이 아니신가요?
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
