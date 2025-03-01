// SpacesList.jsx
import React, { useEffect, useState } from "react";
import SpaceContent from "./SpaceContent";
import EntityMenu from "./EntityMenu";
import CreateProject from "./createProject";
import CreateFolderModal from "./CreateFolderModal";

const SpacesList = ({ workspaceId }) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const [selectedSpaceForProject, setSelectedSpaceForProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFoldertModalOpen] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;

    // Retrieve the token from localStorage
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODE4MDM5LCJleHAiOjE3NDcwMTgwMzl9.of3PfNA0zJcaGWXj-_bRrNEnwlRIz7JrKZMIhiLSbCs";

    // If no token is found, set an error and exit
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Fetch spaces with the token in the Authorization header
    fetch(`http://localhost:5000/api/space/fetchSpace/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSpaces(data.data);
        } else {
          setError(data.message || "Failed to fetch spaces");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching spaces:", err);
        setError("Error fetching spaces");
        setLoading(false);
      });
  }, [workspaceId]);

  if (!workspaceId) {
    return <div>Please select a workspace to view its spaces.</div>;
  }

  if (loading) {
    return <div>Loading spaces...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  // Toggle the clicked space's content
  const handleSpaceClick = (spaceId) => {
    setSelectedSpaceId((prev) => (prev === spaceId ? null : spaceId));
  };

  const actions = {
    createFolder: () => setIsFoldertModalOpen(true),
    createProject: () => setIsProjectModalOpen(true),
    rename: "create",
    delete: "create",
  };

  return (
    <div className="p-4">
      <h2 className="text-lg text-gray-500">My Spaces</h2>
      {spaces.length === 0 ? (
        <p>No spaces available for this workspace.</p>
      ) : (
        <ul>
          {spaces.map((space) => (
            <li key={space.id} className="cursor-pointer">
              <div className="flex items-center justify-between text-sm py-2 hover:bg-gray-200">
                {/* Clicking the space name toggles its content */}
                <span onClick={() => handleSpaceClick(space.id)}>
                  {space.name}
                </span>

                <EntityMenu
                  entityType="space"
                  actions={actions}
                  onSelectSpace={() => setSelectedSpaceForProject(space.id)}
                />
              </div>
              {selectedSpaceId === space.id && (
                <div className="ml-4 mt-2">
                  <SpaceContent spaceId={space.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Create Project Modal */}
      <CreateProject
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        spaceId={selectedSpaceForProject}
        workspaceId={workspaceId}
      />

      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFoldertModalOpen(false)}
        spaceId={selectedSpaceForProject}
      />
    </div>
  );
};

export default SpacesList;
