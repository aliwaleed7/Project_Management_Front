import React from "react";
import TeamDropdown from "./TeamDropdown"; // Import TeamDropdown
import SprintDropdown from "./SprintDropdown";

const TaskHeader = ({ workspaceId, projectId }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-2 rounded-md">
      {/* Left Side: Team & Sprint Buttons */}
      <div className="flex gap-3">
        <TeamDropdown workspaceId={workspaceId} /> {/* Use TeamDropdown */}
        <SprintDropdown projectId={projectId} />
      </div>

      {/* Right Side: Search Input */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-72">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full outline-none bg-transparent text-gray-700"
        />
        <p className="text-gray-500 cursor-pointer" size={20} />
      </div>
    </div>
  );
};

export default TaskHeader;
