// Sidebar.jsx
import WorkspacesDropdown from "./WorkspacesDropdown";
import React, { useState, useEffect } from "react";
import { decodeToken } from "../../utils/decodeToken.js";
import SpacesList from "./SpacesList";
import CreateSpace from "./CreateSpace.jsx";

const Sidebar = ({ setWS_id }) => {
  const [userId, setUserId] = useState(null);
  const [sWorkspace, setSWorkspace] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem("token"); // Replace 'token' with your key

    if (token) {
      // Decode the token to get the payload
      const payload = decodeToken(token);

      if (payload && payload.id) {
        // Set the userId from the payload
        setUserId(payload.id);
      } else {
        console.error("UserId not found in token payload");
      }
    } else {
      console.error("Token not found in local storage");
    }
  }, []); // Run only once when the component mounts

  const handleWorkspaceChange = (workspace) => {
    console.log("Selected Workspace:", workspace);
    // Additional logic on workspace change can go here (e.g., update context or state
    setSWorkspace(workspace.id);
    if (setWS_id) setWS_id(workspace.id);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-100 p-4 overflow-y-auto shadow-md">
      {/* Workspace dropdown to switch between workspaces */}
      <WorkspacesDropdown
        userId={userId}
        onWorkspaceChange={handleWorkspaceChange}
      />

      {/* Static sidebar links */}
      <ul className="mt-4">
        <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
          Inbox
        </li>
        <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
          Dashboard
        </li>
        <li>
          <div>
            <SpacesList workspaceId={Number(sWorkspace)} />
          </div>
        </li>
      </ul>

      {/* Create Space Button */}
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded"
        >
          + Create Space
        </button>
        <CreateSpace
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          workspaceId={sWorkspace}
        />
      </div>
    </div>
  );

};

export default Sidebar;
