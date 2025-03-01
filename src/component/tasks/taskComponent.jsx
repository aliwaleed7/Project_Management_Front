import React from "react";
import TaskHeader from "./TaskHeader";
import { useSelector } from "react-redux";

const TaskComponent = ({ workspaceId }) => {
  const selectedProjectId = useSelector(
    (state) => state.project.selectedProjectId
  );
  return (
    <div>
      <TaskHeader workspaceId={workspaceId} projectId={selectedProjectId} />
      {/* Your task list goes here */}
    </div>
  );
};

export default TaskComponent;
