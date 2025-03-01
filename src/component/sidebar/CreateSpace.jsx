import { useState, useEffect } from "react";
import axios from "axios";
import { decodeToken } from "../../utils/decodeToken"; // Import your decodeToken function

const CreateSpace = ({ isOpen, onClose, workspaceId }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I";
    if (!token) {
      setError("Unauthorized! Please log in.");
      return;
    }
    const user = decodeToken(token);
    if (user?.id) {
      setUserId(user.id);
    } else {
      setError("Failed to retrieve user ID.");
    }
  }, []);

  const handleCreateSpace = async () => {
    if (!name.trim()) {
      setError("Space name is required.");
      return;
    }
    if (!workspaceId || !userId) {
      setError("Workspace ID and user ID are required.");
      return;
    }

    setLoading(true);
    try {
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I";
      const response = await axios.post(
        "http://localhost:5000/api/space/createSpace",
        {
          workspaceId,
          name,
          createdBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Space created:", response.data);
      onClose(); // Close modal after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create space.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Space</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Space Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="mr-2 bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateSpace}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpace;
