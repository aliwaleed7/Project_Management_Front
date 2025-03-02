import React, { useState, useEffect, useRef } from "react";
import CreateSprint from "./CreateSprint";
import DefineSprintTasks from "./DefineSprintTasks";

const SprintDropdown = ({ projectId }) => {
  const [sprints, setSprints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // ✅ Create ref for the dropdown container

  // Fetch Sprints from API
  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch(
          `http://localhost:5000/api/sprint/getSprintsByProject/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (Array.isArray(data)) {
          setSprints(data); // Store fetched sprints
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    if (projectId) fetchSprints(); // Fetch only if projectId exists
  }, [projectId]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sprint Button */}
      <button
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sprint
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-80">
          {sprints.length > 0 ? (
            sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <span>{sprint.name}</span>
                  <DefineSprintTasks
                    projectId={projectId}
                    sprintId={sprint.id}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No sprints available</p>
          )}
          <CreateSprint projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export default SprintDropdown;
