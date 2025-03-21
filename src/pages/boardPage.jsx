import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/Sidebar"; // Import Sidebar
import TaskComponent from "../component/board/TaskList"; // Import TaskComponent

const boardPage = () => {
  const [workspaceId, setWorkspaceId] = useState(null);

  // Function to update the workspace ID
  const handleWorkspaceChange = (id) => {
    setWorkspaceId(id);
  };

  return (
    <div className="flex h-screen">
      <div>
        <Sidebar setWS_id={handleWorkspaceChange} />
      </div>

      <div className="flex-1 p-4 ml-64 ">
        <TaskComponent workspaceId={workspaceId} />
      </div>
    </div>
  );
};

export default boardPage;
