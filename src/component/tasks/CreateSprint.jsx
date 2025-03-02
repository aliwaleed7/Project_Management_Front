import React, { useState } from "react";

const CreateSprint = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const handleCreateSprint = async () => {
    if (!name || !goal || !duration || !projectId) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/sprint/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goal,
          duration: parseInt(duration, 10),
          list_id: projectId, // list_id from props
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create sprint");
      }

      // Reset fields & close modal
      setName("");
      setGoal("");
      setDuration(1);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Create Sprint Button */}
      <button
        className="bg-blue-600 text-white w-full px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Create Sprint
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create Sprint</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="text"
              placeholder="Sprint Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-sm mb-2"
            />

            <input
              type="text"
              placeholder="Sprint Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2 border rounded-md text-sm mb-2"
            />

            {/* Duration Dropdown */}
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded-md text-sm mb-2"
            >
              <option value={1}>1 Week</option>
              <option value={2}>2 Weeks</option>
              <option value={3}>3 Weeks</option>
              <option value={4}>4 Weeks</option>
            </select>

            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={handleCreateSprint}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSprint;
