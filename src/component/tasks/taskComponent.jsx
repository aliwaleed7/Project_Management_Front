import React from "react";
import TaskHeader from "./TaskHeader";
import { useSelector } from "react-redux";
import TaskViewHeader from "./TaskViewHeader";
import TaskList from "./taskList";

const TaskComponent = ({ workspaceId }) => {
  const selectedProjectId = useSelector(
    (state) => state.project.selectedProjectId
  );

  return (
    <div>
      <TaskHeader workspaceId={workspaceId} projectId={selectedProjectId} />
      <TaskViewHeader projectId={selectedProjectId} />
      <TaskList listId={selectedProjectId} />
    </div>
  );
};

export default TaskComponent;
