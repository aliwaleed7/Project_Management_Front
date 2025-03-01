import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/sidebar/Sidebar.jsx";
import AuthPage from "./component/authentication/AuthPage.jsx";
import MainPage from "./pages/mainPage.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );

};

export default App;



