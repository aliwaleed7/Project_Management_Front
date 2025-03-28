import React from "react";
import DashboardHeader from "../component/dashBoard/dashHeader";
import DashboardList from "../component/dashBoard/DashboardList";
import Sidebar from "../component/sidebar/Sidebar"; // Ensure this is correctly imported
import { useSelector } from "react-redux";

const BoardPage = () => {
  const workspaceId = useSelector((state) => state.workspace.workspaceId);

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 ml-64 ">
        <div className="flex flex-col min-h-screen ">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Main Content */}
          <main className="flex-1 container mx-auto p-3">
            {/* Dashboard List - Only render if workspaceId exists */}
            {<DashboardList ws_id={workspaceId} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
