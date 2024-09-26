import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Login/page/LoginPage";
import MainPage from "./Main/page/MainPage";
import SignUpPage from "./SignUp/page/SignUpPage";
import ChattingRoomPage from "./ChattingRoom/page/ChattingRoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chatting/:chatRoomSeq" element={<ChattingRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
