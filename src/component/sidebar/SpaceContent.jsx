// SpaceContent.jsx
import React, { useState, useEffect } from "react";
import EntityMenu from "./EntityMenu";
import CreateProject from "./createProject";
import { useDispatch } from "react-redux";
import { setSelectedProject } from "../../redux/slices/projectSlice.js"; // Import action
import { useLocation, useNavigate } from "react-router-dom";

// Sub-component to handle folder content (lists inside a folder)
const FolderContent = ({ folderId, expanded }) => {
  const [folderLists, setFolderLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (expanded) {
      setLoading(true);
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODQxNzI0LCJleHAiOjE3NDcwNDE3MjR9.V3PQAwYq95q0tfF_yOD8zW4D_35P4hpzeDs-IHZ358o"; // Replace with your default token if needed
      fetch(`http://localhost:5000/api/space/folders/${folderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFolderLists(data.data);
          } else {
            setError(data.message || "Error fetching folder content");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [expanded, folderId]);

  if (!expanded) return null;
  const handleListClick = (listId) => {
    dispatch(setSelectedProject(listId));

    // Navigate only if the current path is /dashContent or /dash
    if (location.pathname === "/dashContent" || location.pathname === "/dash") {
      navigate("/main");
    }
  };

  return (
    <div className="ml-6 mt-1 text-base">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : folderLists.length > 0 ? (
        <ul>
          {folderLists.map((list) => (
            <li
              key={list.id}
              className="mb-1 flex items-center hover:bg-gray-200"
              onClick={() => handleListClick(list.id)}
            >
              <span className="mr-3 inline-block bg-black text-white px-1 py-0.5 rounded"></span>
              {list.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

// Main component to display space content (folders & projects)
const SpaceContent = ({ spaceId }) => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [error, setError] = useState(null);
  // Track which folders are expanded; allow multiple folders to be open.
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [folderId, setFolderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!spaceId) return;
    setLoading(true);
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODQxNzI0LCJleHAiOjE3NDcwNDE3MjR9.V3PQAwYq95q0tfF_yOD8zW4D_35P4hpzeDs-IHZ358o";

    fetch(`http://localhost:5000/api/space/folders-lists/${spaceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders(data.folders || []);
        setLists(data.lists || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [spaceId]);

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  if (!spaceId) return <div>Please select a space.</div>;
  if (loading) return <div>Loading space content...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const actions = {
    createFolder: "create",
    createProject: () => setIsProjectModalOpen(true),
    rename: "create",
    delete: "create",
  };

  const handleListClick = (listId) => {
    dispatch(setSelectedProject(listId));

    // Navigate only if the current path is /dashContent or /dash
    if (location.pathname === "/dashContent" || location.pathname === "/dash") {
      navigate("/main");
    }
  };

  return (
    <div className="p-2">
      {folders.length > 0 && (
        <ul>
          <p className="text-xl font-semibold text-slate-600 mb-4 text-left">
            Folders:
          </p>
          {folders.map((folder) => (
            <li key={folder.id} className="mb-2">
              <div
                className="py-1 cursor-pointer flex items-center justify-between hover:bg-gray-200"
                onClick={() => toggleFolder(folder.id)}
              >
                <span>{folder.name}</span>
                <div
                  onClick={(e) => e.stopPropagation()} // Prevents folder toggle when clicking EntityMenu
                >
                  <EntityMenu
                    entityType="folder"
                    actions={actions}
                    onSelectSpace={() => setFolderId(folder.id)}
                  />
                </div>
              </div>
              <FolderContent
                folderId={folder.id}
                expanded={expandedFolders.includes(folder.id)}
              />
            </li>
          ))}
        </ul>
      )}
      <p class="text-xl font-semibold text-slate-600 mb-4 text-left">
        Projects :{" "}
      </p>
      {lists.length > 0 && (
        <ul>
          {lists.map((list) => (
            <li
              key={list.id}
              className="py-1 flex items-center justify-between hover:bg-gray-200"
              onClick={() => handleListClick(list.id)}
            >
              <span>{list.name}</span>
              <EntityMenu
                entityType="project"
                actions={actions}
                //   onSelectSpace={() => setSelectedSpaceForProject()}
              />
            </li>
          ))}
        </ul>
      )}
      {/* Create Project Modal */}
      <CreateProject
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        spaceId={spaceId}
        folderId={folderId}
      />
    </div>
  );
};

export default SpaceContent;
