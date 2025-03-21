import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SprintFilter from "./SprintFilter";
import SprintKanbanBoard from "./sprintKanban";
import { FaThLarge } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";

const TaskList = ({ workspaceId }) => {
  const [selectedSprintIds, setSelectedSprintIds] = useState([]);

  const selectedProjectId = useSelector(
    (state) => state.project.selectedProjectId
  );

  // Reset selectedSprintIds when selectedProjectId changes
  useEffect(() => {
    setSelectedSprintIds(null);
  }, [selectedProjectId]);

  const handleSprintsSelection = (sprintIds) => {
    setSelectedSprintIds(sprintIds);
    console.log("Selected Sprints:", sprintIds);
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex space-x-6 text-gray-600 text-lg p-4 border-b">
        <div className="flex items-center cursor-pointer hover:text-black transition duration-200 px-3 py-2 rounded-md">
          <FaThLarge className="mr-2 text-xl" />
          <span>Board</span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-black transition duration-200 px-3 py-2 rounded-md">
          <BsListTask className="mr-2 text-xl" />
          <span>List</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto p-6 space-y-6">
        {/* Sprint Filter & Search Input */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded-md p-2 w-35 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <SprintFilter
            projectId={selectedProjectId}
            onSprintsSelect={handleSprintsSelection}
          />
        </div>

        {/* Kanban Board */}
        <div className="shadow-md rounded-lg">
          <SprintKanbanBoard
            sprintIds={selectedSprintIds}
            projectId={selectedProjectId}
            WsId={workspaceId}
          />
        </div>
      </div>
    </div>
  );


};

export default TaskList;


