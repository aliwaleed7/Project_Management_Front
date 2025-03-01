import { useState } from "react";

const CreateTeam = ({ workspaceId, onTeamCreated }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [teamName, setTeamName] = useState("");

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await fetch("http://localhost:5000/api/teams/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request
        },
        body: JSON.stringify({
          teamName,
          workspaceId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onTeamCreated(data.team); // Update the team list
        setTeamName("");
        setIsCreating(false); // Hide input field after creation
      } else {
        console.error("Error creating team:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="p-2 border-t mt-2">
      {isCreating ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            className="w-full px-2 py-1 border rounded-md outline-none"
          />
          <button
            onClick={handleCreateTeam}
            className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            ✓
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="text-blue-600 underline hover:text-blue-800 transition w-full text-left"
        >
          + Create Team
        </button>
      )}
    </div>
  );
};

export default CreateTeam;
