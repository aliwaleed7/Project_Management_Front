import React from "react";
import Sidebar from "../component/sidebar/Sidebar"; // Ensure this is correctly imported
import DashBoardContent from "../component/dashBoard/dashContent/DashBoardContent";

const BoardPage = () => {
 
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 ml-64 ">
        <div className="flex flex-col min-h-screen ">
          <DashBoardContent />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
