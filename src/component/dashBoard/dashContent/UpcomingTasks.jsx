import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingTasks = ({ listId }) => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dash/upcoming-deadlines/${listId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
      }
    };

    fetchUpcomingTasks();
  }, [listId]);

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 h-80 overflow-y-auto shadow-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Upcoming Deadlines
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm py-2">No tasks due soon</p>
      ) : (
        <ul className="space-y-2.5">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 bg-gray-50 rounded border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-normal">{task.title}</span>
                <span className="text-gray-600 text-xs font-medium">
                  {new Date(task.dueDate).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingTasks;
