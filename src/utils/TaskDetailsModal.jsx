import { useState, useEffect } from "react";
import UpdateTaskStatus from "../utils/UpdateTaskStatus";
// import TaskDependency from "../component/tasks/TaskDependency";
import { useSelector } from "react-redux";

const TaskDetailsModal = ({ task }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false); // 🔹 Refresh state to trigger refetch

  // 🔹 Fetch task details (Runs when `refresh` changes)
  useEffect(() => {
    if (isOpen) fetchTaskDetails();
  }, [refresh]);

  const fetchTaskDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/task/getTaskDetails/${task.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch task details");

      const data = await response.json();
      setTaskDetails(data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  // 🔹 Trigger a refresh after status update
  const handleStatusUpdate = (newStatus) => {
    console.log("Task status updated to:", newStatus);
    setRefresh((prev) => !prev); // 🔹 Toggle refresh state to refetch data
  };

  const selectedProjectId = useSelector(
    (state) => state.project.selectedProjectId
  );

  const onTaskUpdate = () => {
    console.log("Task status updated to:");

  };

  return (
    <div>
      {/* Task Title (click to open modal) */}
      <div className="flex items-center gap-3 cursor-pointer">
        <input type="radio" className="cursor-pointer" />
        <span
          onClick={() => {
            fetchTaskDetails();
            setIsOpen(true); // Open modal
          }}
          className="font-medium text-gray-800 hover:underline"
        >
          {task.title}
        </span>
      </div>

      {/* Modal */}
      {isOpen && taskDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn">
            {/* Close Button (Top Right) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close modal"
            >
              ✖
            </button>

            {/* Task Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
              {taskDetails.title}
            </h2>

            {/* Task Description */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              {taskDetails.description || "No description provided."}
            </p>

            {/* Task Details Section */}
            <div className="space-y-3 text-sm">
              <p className="flex justify-between border-b pb-1">
                <span className="font-medium text-gray-600">Status:</span>
                <UpdateTaskStatus
                  taskId={task.id}
                  currentStatus={taskDetails.status} // Use updated taskDetails
                  onStatusUpdate={handleStatusUpdate} // 🔹 Trigger refresh
                />
              </p>
              <p className="flex justify-between border-b pb-1">
                <span className="font-medium text-gray-600">Priority:</span>
                <span className="text-gray-800">{taskDetails.priority}</span>
              </p>
              <p className="flex justify-between border-b pb-1">
                <span className="font-medium text-gray-600">Due Date:</span>
                <span className="text-gray-800">
                  {new Date(taskDetails.dueDate).toLocaleDateString()}
                </span>
              </p>
              <p className="flex justify-between border-b pb-1">
                <span className="font-medium text-gray-600">Assigned to:</span>
                <span className="text-gray-800">
                  {taskDetails.user_team_workspace?.User?.username ||
                    "Unassigned"}
                </span>
              </p>

              {/* ============ this section for dependency ============ */}
              {/* <p className="flex justify-between">
                <span className="font-medium text-gray-600">Dependency:</span>
                <TaskDependency
                  taskId={task.id}
                  listId={selectedProjectId} // Make sure listId is available
                  onDependencyCreated={onTaskUpdate} // Refresh task list
                />
              </p> */}

              {/* ================================================== */}
            </div>

            {/* Modal Footer with Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsModal;
