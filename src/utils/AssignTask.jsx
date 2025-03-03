import React, { useState, useEffect } from "react";

const AssignTask = ({ projectId, onSelectUser }) => {
  const [members, setMembers] = useState([]);
  const [teamName, setTeamName] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const response = await fetch(
          `http://localhost:5000/api/teams/project/${projectId}/members`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();
        setTeamName(data.team_name);
        setMembers(data.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (projectId) {
      fetchMembers();
    }
  }, [projectId]);


  const handleSelectUser = (user) => {
    setSelectedUser(user);
    onSelectUser(user.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-lg px-4 py-2 flex items-center gap-2"
      >
        {selectedUser ? selectedUser.username : "Assign To"}
      </button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2">
          {teamName && <p className="font-bold text-center">{teamName}</p>}
          <ul>
            {members.map((member) => (
              <li
                key={member.id}
                onClick={() => handleSelectUser(member)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {member.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssignTask;