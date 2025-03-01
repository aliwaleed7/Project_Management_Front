import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchTeams from "../../utils/fetchTeams";
import { decodeToken } from "../../utils/decodeToken";
import getUserRole from "../../utils/getUserRole";

const CreateProject = ({ isOpen, onClose, workspaceId, spaceId, folderId }) => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [assignedTeamId, setAssignedTeamId] = useState(null);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchTeams(workspaceId, setTeams);
    }
  }, [isOpen, workspaceId]);

  const handleCreateProject = async () => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I";
    if (!token) {
      setError("Unauthorized! Please log in.");
      return;
    }

    const user = decodeToken(token); // Get user payload
    if (!user?.id) {
      setError("Invalid token or user data.");
      return;
    }

    const userRole = await getUserRole(user.id); // Wait for role fetch
    setRole(userRole);

    if (!["admin", "team_leader"].includes(userRole)) {
      setError(
        "Permission denied. Only admin or team leader can create a project."
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/space/lists",
        {
          name,
          created_by: user.id,
          space_id: spaceId, // Space ID is required
          assigned_teamId: assignedTeamId || null,
          folder_id: folderId || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Project created successfully!");
      onClose(); // Close modal after success
    } catch (err) {
      setError(err.response?.data?.message || "Error creating project");
    }
  };

  if (!isOpen) return null; // Prevent rendering when modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-center"
        />

        <select
          value={assignedTeamId || ""}
          onChange={(e) => setAssignedTeamId(e.target.value || null)}
          className="w-full p-2 mb-3 border rounded text-center"
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.team_name}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
