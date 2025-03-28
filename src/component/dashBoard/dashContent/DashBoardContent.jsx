import { useSelector } from "react-redux";
import PieChart from "./PieChart.jsx";
import DueDateTasks from "./DueDateTasks.jsx";
import ProgressBar from "./ProgressBar.jsx";
import UpcomingTasks from "./UpcomingTasks.jsx";
import UrgentTasks from "./UrgentTasks.jsx";
import DashboardButton from "../DashboardButton.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const listId = useSelector((state) => state.dashboard.listId);
  const [listName, setListName] = useState("Loading...");

  useEffect(() => {
    if (!listId) return;

    const fetchListName = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/dash/lists/${listId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setListName(response.data.name || "Unknown Project");
      } catch (error) {
        console.error("Error fetching list name:", error);
        setListName("Unknown Project");
      }
    };

    fetchListName();
  }, [listId]);

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-lg">
        <h1 className="text-xl text-gray-700">Dashboard for : {listName}</h1>
        <DashboardButton />
      </header>

      {/* Content Section */}
      <div className="mt-6 space-y-6">
        {/* Progress Bar */}
        <ProgressBar listId={listId} />

        {/* Pie Chart & Upcoming Tasks in a Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <PieChart projectId={listId} />

          {/* Upcoming Tasks */}
          <UpcomingTasks listId={listId} />
        </div>

        {/* Urgent Tasks */}

        <UrgentTasks projectId={listId} />

        {/* Due Date Tasks */}
        <DueDateTasks listId={listId} />
      </div>
    </div>
  );
};

export default Dashboard;
