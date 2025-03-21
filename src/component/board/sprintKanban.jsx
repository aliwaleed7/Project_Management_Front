import { useEffect, useState } from "react";
import axios from "axios";

const SprintKanbanBoard = ({ sprintIds, projectId, WsId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset tasks when projectId changes
  useEffect(() => {
    setTasks([]); // Clear tasks when projectId changes
  }, [projectId, WsId]);

  // Fetch tasks when sprintIds change
  useEffect(() => {
    const fetchTasks = async () => {
      if (!sprintIds || sprintIds.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch the token from local storage
        const token = localStorage.getItem("token");

        // Check if the token exists
        if (!token) {
          throw new Error("No token found in local storage");
        }

        // Make the POST request with the token in the Authorization header
        const response = await axios.post(
          "http://localhost:5000/api/sprint/filter-tasks",
          { sprintIds }, // Request payload
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
      }

      setLoading(false);
    };

    fetchTasks();
  }, [sprintIds]);

  // Group tasks by status
  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center text-blue-500">Loading tasks...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4">
          {/* Columns */}
          {Object.keys(groupedTasks).map((status) => (
            <div key={status} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-gray-700 mb-3">{status}</h2>

              {/* Task Cards */}
              {groupedTasks[status].map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-7 rounded-lg shadow-md mb-2"
                >
                  <h3 className="text-md font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    Due:{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))}

              {groupedTasks[status].length === 0 && (
                <p className="text-gray-400 text-sm">No tasks</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SprintKanbanBoard;
