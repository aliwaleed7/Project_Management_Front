import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/sidebar/Sidebar.jsx";
import AuthPage from "./component/authentication/AuthPage.jsx";
import MainPage from "./pages/mainPage.jsx";
import BoardPage from "./pages/boardPage.jsx";
import DashboardCreator from "./component/dashBoard/newDashbut.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/dash" element={<DashboardCreator />} />
      </Routes>
    </Router>
  );

};

export default App;



