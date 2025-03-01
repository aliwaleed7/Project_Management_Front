import { useState, useEffect } from "react";
import { decodeToken } from "../../utils/decodeToken";

const CreateFolderModal = ({ isOpen, onClose, spaceId }) => {
  const [folderName, setFolderName] = useState("");
  const [userId, setUserId] = useState(null);

  // Function to get token and extract user ID
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I";
    if (token) {
      const payload = decodeToken(token); // Assuming this function is defined in your project
      setUserId(payload?.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim() || !spaceId || !userId) return;

    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I"; // Get token for authorization

    const requestBody = {
      space_id: spaceId,
      name: folderName,
      created_by: userId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/space/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        alert("Folder created successfully!"); // You can replace this with a toast
        onClose(); // Close modal
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("An error occurred while creating the folder.");
    }
  };

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
