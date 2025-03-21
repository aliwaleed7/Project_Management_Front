import React, { useEffect, useState } from "react";
import TaskItem from "./taskItem";



const TaskList = ({ listId }) => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, authorization required!");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/space/fetchTasks/${listId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          // Divide tasks based on status
          const categorizedTasks = {
            todo: data.tasks.filter((task) => task.status === "To Do"),
            inProgress: data.tasks.filter(
              (task) => task.status === "In Progress"
            ),
            done: data.tasks.filter((task) => task.status === "Completed"),
          };
          setTasks(categorizedTasks);
        } else {
          console.error("Failed to fetch tasks:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [listId]); // Runs when `listId` changes

  // you should pass to task Item List Id

  return (
    <div className="p-5 space-y-6">
      {/* To Do Section */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">To Do</h3>
      <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {tasks.todo.length > 0 ? (
          <div className="space-y-2">
            {tasks.todo.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks</p>
        )}
      </div>

      {/* In Progress Section */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">In Progress</h3>
      <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {tasks.inProgress.length > 0 ? (
          <div className="space-y-2">
            {tasks.inProgress.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks</p>
        )}
      </div>

      {/* Done Section */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Done</h3>
      <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {tasks.done.length > 0 ? (
          <div className="space-y-2">
            {tasks.done.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
