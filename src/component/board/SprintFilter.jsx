import { useEffect, useState } from "react";
import axios from "axios";

const SprintFilter = ({ projectId, onSprintsSelect }) => {
  const [sprints, setSprints] = useState([]);
  const [selectedSprints, setSelectedSprints] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchSprints();
    }
  }, [projectId]);

  const fetchSprints = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      const response = await axios.get(
        `http://localhost:5000/api/sprint/getSprintsByProject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      setSprints(response.data);
    } catch (error) {
      console.error("Error fetching sprints:", error);
    }
  };

  const handleSprintToggle = (sprint) => {
    const isAlreadySelected = selectedSprints.some((s) => s.id === sprint.id);
    let updatedSelection;

    if (isAlreadySelected) {
      updatedSelection = selectedSprints.filter((s) => s.id !== sprint.id);
    } else {
      updatedSelection = [...selectedSprints, sprint];
    }

    setSelectedSprints(updatedSelection);
    onSprintsSelect(updatedSelection.map((s) => s.id)); // Send selected sprint IDs to parent
  };

  return (
    <div className="relative inline-block">
      {/* Filter Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-1 bg-gray-200 text-black-700 font-medium rounded-md  hover:bg-gray-300 transition"
      >
        Filter
        <span className="text-black-500">▼</span> {/* Dropdown icon */}
      </button>

      {/* Dropdown List */}
      {showDropdown && (
        <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {sprints.length > 0 ? (
            sprints.map((sprint) => (
              <label
                key={sprint.id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedSprints.some((s) => s.id === sprint.id)}
                  onChange={() => handleSprintToggle(sprint)}
                  className="mr-2"
                />
                {sprint.name}
              </label>
            ))
          ) : (
            <p className="p-3 text-gray-500 italic">No sprints available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SprintFilter;
