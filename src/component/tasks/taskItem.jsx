//you should add new parameter to accept projectId
import React from "react";
import {
  FaUserPlus,
  FaCalendarAlt,
  FaFlag,
  FaCommentDots,
} from "react-icons/fa";
import TaskDetailsModal from "../../utils/TaskDetailsModal";

const TaskItem = ({ task }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white shadow rounded-lg border">
      {/* Task Name */}
        <TaskDetailsModal key={task.id} task={task} />

      {/* Task Details */}
      <div className="flex items-center gap-5 text-gray-600">
        {/* Assignee */}
        {/* <FaUserPlus
          className="cursor-pointer hover:text-black"
          title="Assign User"
        /> */}

        {/* Due Date */}
        {/* <FaCalendarAlt
          className={`cursor-pointer ${
            task.due_date ? "text-red-500" : "hover:text-black"
          }`}
          title={
            task.due_date
              ? `Due: ${new Date(task.due_date).toLocaleDateString()}`
              : "Set Due Date"
          }
        /> */}

        {/* Priority */}
        {/* <FaFlag
          className="cursor-pointer hover:text-black"
          title={task.priority || "Set Priority"}
        /> */}

        {/* Comments */}
        <FaCommentDots
          className="cursor-pointer hover:text-black"
          title="View Comments"
        />
      </div>
    </div>
  );
};

export default TaskItem;
