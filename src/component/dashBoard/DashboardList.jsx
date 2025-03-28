import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { setListId } from "../../redux/slices/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DashboardList = ({ ws_id }) => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch dashboards function
  const fetchDashboards = useCallback(async () => {
    if (!ws_id) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token not found");

      const { data } = await axios.get(
        `http://localhost:5000/api/dash/dashboards/${ws_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDashboards(data);
    } catch (err) {
      console.error("Error fetching dashboards:", err);
      setError(err.response?.data?.message || "Failed to load dashboards.");
    } finally {
      setLoading(false);
    }
  }, [ws_id]);

  useEffect(() => {
    fetchDashboards();
  }, [fetchDashboards]);

  // Handle dashboard click
  const handleListClick = (listId) => {
    dispatch(setListId(listId));
    navigate("/dashContent");
  };

  // Handle edit click
  const handleEditClick = (dashboard) => {
    setEditingId(dashboard.id);
    setNewName(dashboard.dash_name);
  };

  // Handle update dashboard name
  const handleUpdate = async (id) => {
    if (
      !newName.trim() ||
      dashboards.find((d) => d.id === id)?.dash_name === newName
    ) {
      setEditingId(null);
      return; // Prevent empty or duplicate updates
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/dash/update/${id}`,
        { dash_name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditingId(null);
      fetchDashboards(); // Refresh dashboard list
    } catch (error) {
      console.error("Failed to update dashboard name:", error);
      setError("Failed to update dashboard.");
    }
  };

  return (
    <div className="w-full mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
        Dashboards
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading dashboards...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && dashboards.length === 0 && (
        <p className="text-center text-gray-500">No dashboards available.</p>
      )}

      {!loading && !error && dashboards.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {dashboards.map((dashboard) => (
            <li
              key={dashboard.id}
              className="p-3 hover:bg-gray-100 rounded-md transition flex justify-between items-center"
              onClick={() => {
                if (editingId !== dashboard.id) {
                  handleListClick(dashboard.list_id);
                }
              }}
            >
              {editingId === dashboard.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
                  onBlur={() => handleUpdate(dashboard.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdate(dashboard.id)
                  }
                  autoFocus
                />
              ) : (
                <div // Wrapping in a div to prevent propagation issues
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent li click when editing
                    handleEditClick(dashboard);
                  }}
                  className="cursor-pointer font-medium"
                >
                  {dashboard.dash_name}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardList;
