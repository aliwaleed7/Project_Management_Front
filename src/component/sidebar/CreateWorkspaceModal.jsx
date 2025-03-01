// CreateWorkspaceModal.jsx
import React, { useState } from "react";

const CreateWorkspaceModal = ({ isOpen, onClose, onWorkspaceCreated }) => {
  const [workspaceName, setWorkspaceName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODA0ODQ5LCJleHAiOjE3NDcwMDQ4NDl9.ccOhWEISV0e0o--rQKrJQ75DV4U6YJSC-iWyCal-uCQ";
    try {
      const res = await fetch("http://localhost:5000/api/workspace/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: workspaceName }),
      });
        const data = await res.json();
        console.log("WSs : "+ data.workspace),
      // Assuming the API returns the newly created workspace object
      onWorkspaceCreated(data.workspace);
      setWorkspaceName("");
      onClose();
    } catch (err) {
      console.error("Failed to create workspace", err);
      alert("Failed to create workspace");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Workspace</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded  mb-4 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );


};

export default CreateWorkspaceModal;
