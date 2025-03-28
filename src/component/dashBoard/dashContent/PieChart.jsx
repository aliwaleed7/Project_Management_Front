import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const TaskStatusChart = ({ projectId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          `http://localhost:5000/api/dash/task-status/${projectId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const formattedData = Object.entries(response.data.data).map(
          ([key, value], index) => ({
            name: key,
            value,
            color: COLORS[index % COLORS.length],
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching task status data:", error);
      }
    };

    fetchTaskStatus();
  }, [projectId]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log("payLoade : ", payload);
      return (
        <div className="bg-white p-2 shadow-md rounded-lg text-gray-700">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{`Tasks: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-80">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Task Status Distribution
      </h2>
      {data.length > 0 ? (
        <PieChart width={410} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskStatusChart;
