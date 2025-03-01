// WorkspacesDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

const WorkspacesDropdown = ({ userId, onWorkspaceChange }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dropdownRef = useRef();

  // Fetch workspaces for the given user
  useEffect(() => {
    if (!userId) return;

    // Retrieve token from local storage
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODE4MDM5LCJleHAiOjE3NDcwMTgwMzl9.of3PfNA0zJcaGWXj-_bRrNEnwlRIz7JrKZMIhiLSbCs";

    fetch(`http://localhost:5000/api/workspace/users/${userId}/workspaces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Add token if it exists
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.workspaceData) {
          setWorkspaces(data.workspaceData);
          if (data.workspaceData.length > 0) {
            setSelectedWorkspace(data.workspaceData[0]);
            if (onWorkspaceChange) {
              onWorkspaceChange(data.workspaceData[0]);
            }
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch workspaces:", err);
      });
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsDropdownOpen(false);
    if (onWorkspaceChange) {
      onWorkspaceChange(workspace);
    }
  };

  // Update workspaces when a new workspace is created
  const handleWorkspaceCreated = (newWorkspace) => {
    setWorkspaces((prev) => [...prev, newWorkspace]);
    setSelectedWorkspace(newWorkspace);
    if (onWorkspaceChange) {
      onWorkspaceChange(newWorkspace);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown header */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedWorkspace ? selectedWorkspace.name : "Select Workspace"}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg">
          <ul>
            {workspaces.map((ws) => (
              <li
                key={ws.id}
                onClick={() => handleSelectWorkspace(ws)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {ws.name}
              </li>
            ))}
            {/* Create Workspace button inside the menu */}
            <li className="p-2 border-t">
              <button
                onClick={() => {
                  setIsCreateModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left text-blue-500 hover:underline"
              >
                + Create Workspace
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onWorkspaceCreated={handleWorkspaceCreated}
      />
    </div>
  );
};

export default WorkspacesDropdown;
