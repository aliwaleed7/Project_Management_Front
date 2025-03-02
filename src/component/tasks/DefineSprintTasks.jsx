import React, { useState, useEffect } from "react";

const DefineSprintTasks = ({ projectId, sprintId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    

  // Fetch tasks for the project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/sprint/getTasksById/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (isOpen) {
      fetchTasks();
    }
  }, [isOpen, projectId]);

  // Select a task
  const handleSelectTask = (task) => {
    if (!selectedTasks.some((t) => t.id === task.id)) {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  // Remove task if added by mistake
  const handleRemoveTask = (taskId) => {
    setSelectedTasks(selectedTasks.filter((task) => task.id !== taskId));
  };

  // Update selected tasks with sprint ID
  const handleUpdateTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      for (const task of selectedTasks) {
        const response = await fetch(
          `http://localhost:5000/api/task/tasks/${task.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sprintId }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update task ${task.id}`);
        }
      }

      alert("Tasks assigned to sprint successfully!");
      setSelectedTasks([]);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Define Sprint Tasks Button */}
      <button
        className="text-blue-600 underline hover:text-blue-800 transition whitespace-nowrap"
        onClick={() => setIsOpen(true)}
      >
        Define Tasks
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Define Sprint Tasks</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Task List */}
            <div className="max-h-60 overflow-y-auto mb-4">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-sm">No tasks found.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-2 border rounded-md mb-2 cursor-pointer ${
                      selectedTasks.some((t) => t.id === task.id)
                        ? "bg-blue-300"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSelectTask(task)}
                  >
                    {task.title}
                  </div>
                ))
              )}
            </div>

            {/* Selected Tasks */}
            {selectedTasks.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium">Selected Tasks:</h3>
                {selectedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center p-2 border rounded-md bg-blue-200 mb-2"
                  >
                    <span>{task.title}</span>
                    <button
                      className="text-red-600 text-sm"
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={handleUpdateTasks}
                disabled={loading || selectedTasks.length === 0}
              >
                {loading ? "Updating..." : "Update Tasks"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefineSprintTasks;
