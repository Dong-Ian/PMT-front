import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { modeState } from "./Utils/Atom/Atom";

import LoginPage from "./Login/page/LoginPage";
import SignUpPage from "./SignUp/page/SignUpPage";
import MainPage from "./Main/page/MainPage";
import ChattingPage from "./Chatting/ChattingPage";

function App() {
  const mode = useRecoilValue(modeState);
  useEffect(() => {
    document.body.style.backgroundColor = mode === false ? "black" : "#eeeeee";
    document.body.style.color = mode === false ? "white" : "black";
  }, [mode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chatting/:chatRoomSeq" element={<ChattingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
