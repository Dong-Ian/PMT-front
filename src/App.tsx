import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Login/page/LoginPage";
import SignUpPage from "./SignUp/page/SignUpPage";
import MainPage from "./Main/page/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
