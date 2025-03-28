import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react"; // Importing an alert icon

const UrgentTasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUrgentTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/dash/urgent/${projectId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching urgent tasks:", error);
      }
    };

    fetchUrgentTasks();
  }, [projectId]);

  return (
  <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-200 h-80 overflow-y-auto">
    <div className="flex items-center gap-2 text-orange-600 mb-4">
      <AlertTriangle size={20} />
      <h2 className="text-xl font-semibold">Urgent Tasks</h2>
    </div>

    {tasks.length === 0 ? (
      <p className="text-gray-500 text-center">No urgent tasks.</p>
    ) : (
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-orange-50 p-2 rounded-lg shadow-sm flex justify-between items-center border border-orange-300 transition hover:bg-orange-100"
          >
            <span className="font-medium text-gray-800">{task.title}</span>
            <span className="text-sm text-gray-600">
              {new Date(task.dueDate).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>

  );
};

export default UrgentTasks;
