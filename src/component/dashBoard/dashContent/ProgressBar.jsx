import React, { useEffect, useState } from "react";
import axios from "axios";

const ProgressBar = ({ listId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.put(
          `http://localhost:5000/api/dash/update-progress/${listId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.result) {
          setProgress(response.data.result.progress);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [listId]);

  return (
    <div className="flex justify-center items-center w-full bg-white p-3 shadow-md rounded-lg text-center">
      <div className="w-full">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Progress: {progress}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
          {/* Add percentage label inside the progress bar */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );

  
};

export default ProgressBar;
