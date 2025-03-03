import { useState } from "react";
import DueDatePicker from "./DueDatePicker";
import AssignTask from "../../utils/AssignTask";
import PrioritySelector from "./PrioritySelector";


const AddTaskModal = ({ isOpen, onClose, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [priority, setPriority] = useState(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized!");
      return;
    }

    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    const taskData = {
      title,
      description: description || "", // Optional, default to empty string
      list_id: projectId, // Ensure this comes from state or props
      assigned_to: assignee || null, // Ensure optional field
      status: "To Do", // Default status if not provided
      priority: priority || "Low", // Default to "Low"
      due_date: deadline || null, // Ensure optional field
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
        setTitle("");
        setDescription("");
        setAssignee(null);
        setPriority(null);
        setDeadline(null);

        onClose();
      } else {
        alert(data.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("An error occurred while creating the task.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Create New Task
        </h2>

        {/* Task Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task Description"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Due Date, Assign, and Priority */}
          <div className="flex flex-wrap gap-3">
            <DueDatePicker onDateChange={setDeadline} />
            <AssignTask projectId={projectId} onSelectUser={setAssignee} />
            <PrioritySelector onPriorityChange={setPriority} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
