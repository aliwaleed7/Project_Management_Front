import { useState } from "react";

const UpdateTaskStatus = ({ taskId, currentStatus, onStatusUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const statuses = ["To Do", "In Progress", "Completed"];

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      const response = await fetch(
        `http://localhost:5000/api/task/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set token in Authorization header
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task status");

      const updatedTask = await response.json();
      setSelectedStatus(updatedTask.status); // Update local state
      onStatusUpdate(updatedTask.status); // Notify parent component
      setIsOpen(false); // Close dropdown
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="relative">
      {/* Task Status (Click to Open Dropdown) */}
      <p
        className="flex justify-between border-b pb-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-800">{selectedStatus}</span>
      </p>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border rounded-lg shadow-md z-50">
          {statuses.map((status) => (
            <div
              key={status}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedStatus === status
                  ? "font-bold text-blue-600"
                  : "text-gray-800"
              }`}
              onClick={() => updateStatus(status)}
            >
              <input
                type="radio"
                checked={selectedStatus === status}
                className="cursor-pointer"
                readOnly
              />
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateTaskStatus;
