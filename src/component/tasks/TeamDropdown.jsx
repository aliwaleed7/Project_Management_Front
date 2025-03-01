import React, { useState, useEffect, useRef } from "react";
import CreateTeam from "./CreateTeam";

const TeamDropdown = ({ workspaceId }) => {
  const [teams, setTeams] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch(
          `http://localhost:5000/api/teams/workspace/${workspaceId}/teams`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setTeams(data.data); // Store teams in state
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [workspaceId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle new team creation
  const handleTeamCreated = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]); // Add the new team dynamically
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Team Button */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        Team
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-80">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.id}
                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
              >
                <span className="text-gray-800">{team.team_name}</span>
                <button className="text-blue-600 underline hover:text-blue-800 transition whitespace-nowrap">
                  Add Member
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No teams available</p>
          )}

          {/* Create Team Button at the Bottom */}
          <CreateTeam
            workspaceId={workspaceId}
            onTeamCreated={handleTeamCreated}
          />
        </div>
      )}
    </div>
  );
};

export default TeamDropdown;
