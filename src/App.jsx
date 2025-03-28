import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/sidebar/Sidebar.jsx";
import AuthPage from "./component/authentication/AuthPage.jsx";
import MainPage from "./pages/mainPage.jsx";
import BoardPage from "./pages/boardPage.jsx";
import DashBoard from "./pages/dashboardPage.jsx";
import DashContent from "./pages/ProjectDash.jsx";
// import DashboardHeader from "./component/dashBoard/DashboardList.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/dashContent" element={<DashContent />} />
      </Routes>
    </Router>
  );

};

export default App;



