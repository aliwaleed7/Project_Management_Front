import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react"; // Import an icon for a better look

const DueDateTasks = ({ listId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDueTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          `http://localhost:5000/api/dash/due-date/${listId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching due date tasks:", error);
      }
    };

    fetchDueTasks();
  }, [listId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 h-72 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <AlertTriangle className="text-gray-600" size={22} /> Due Date Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No overdue tasks 🎉</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center  transition hover:bg-gray-100"
            >
              <div>
                <span className="font-medium text-gray-900 text-base">
                  {task.title}
                </span>
              </div>
              <span className="text-gray-600 text-sm font-medium">
                {new Date(task.dueDate).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default DueDateTasks;
