import { useState } from "react";
import DueDatePicker from "./DueDatePicker";
import AssignTask from "./AssignTask";
import { FaUserFriends } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { FaFlag } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

const AddTaskModal = ({ isOpen, onClose, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [assignee, setAssignee] = useState(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized!");
      return;
    }

    const taskData = {
      title,
      description,
      deadline,
      assignee,
      priority,
      dependency,
      projectId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/task/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Task created successfully!");
        onClose();
      } else {
        alert(data.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center   bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 border rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          className="w-full p-2 border rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DueDatePicker onDateChange={setDeadline} />
        <AssignTask projectId={projectId} onSelectUser={setAssignee} />

        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
