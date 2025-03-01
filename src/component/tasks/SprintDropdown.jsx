import React, { useState, useEffect, useRef } from "react";

const SprintDropdown = ({ projectId }) => {
  const [sprints, setSprints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-60">
          {sprints.length > 0 ? (
            sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                {sprint.name}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No sprints available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SprintDropdown;
