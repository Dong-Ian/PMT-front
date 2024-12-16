import { Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import styles from "../style/signup.module.css";
import SignUpFunction from "../function/SignUpFunction";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function SignUp() {
    const result = await SignUpFunction({ name, email, password });

    if (result.code === "0000") {
      alert("회원가입이 성공적으로 완료되었습니다.\n로그인창으로 이동합니다.");
      navigate("/");
      return;
    }

    if (result.code === "USU03") {
      alert("이미 존재하는 아이디입니다.\n다른 아이디를 사용해주세요.");
      return;
    }
  }

  return (
    <div className={styles.signup_box}>
      <p>회원가입</p>
      <TextInput
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="이름을 입력해주세요"
        style={{ width: "100%", maxWidth: "530px" }}
      />
      <TextInput
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        placeholder="이메일을 입력해주세요"
        style={{ width: "100%", maxWidth: "530px" }}
      />
      <PasswordInput
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        placeholder="비밀번호를 입력해주세요"
        style={{ width: "100%", maxWidth: "530px" }}
      />
      <Button
        variant="gradient"
        gradient={{ from: "gray", to: "cyan", deg: 90 }}
        style={{ width: "530px" }}
        onClick={() => SignUp()}
      >
        회원가입
      </Button>
    </div>
  );
};

export default SignUpPage;
