import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Login/page/LoginPage";
import SignUpPage from "./SignUp/page/SignUpPage";
import MainPage from "./Main/page/MainPage";
import Projectpage from "./Project/page/ProjectPage";
import CreateProjectPage from "./Project/page/CreateProjectPage";
import ValidatePage from "./Utils/page/ValidatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ValidatePage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/project" element={<Projectpage />} />
      </Routes>
    </Router>
  );
}

export default App;
