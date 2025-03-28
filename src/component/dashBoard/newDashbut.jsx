import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Select, message } from "antd";
import { useSelector } from "react-redux";
import { setListId } from "../../redux/slices/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DashboardCreator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const workspaceId = useSelector((state) => state.workspace.workspaceId);

  console.log("Current Workspace ID:", workspaceId);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch spaces and their projects
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/space/spaces-with-projects?workspace_id=${workspaceId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSpaces(response.data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
        message.error("Failed to fetch spaces.");
      }
    };

    if (isModalOpen) fetchSpaces();
  }, [isModalOpen, token]);

  // Handle dashboard creation
  const createDashboard = async () => {
    if (!selectedProject) {
      message.warning("Please select a project.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dash/create",
        {
          dash_name: "New Dashboard",
          list_id: selectedProject,
          ws_id: 2,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Dashboard created successfully!");

      // Extract listId (project ID) from response
      const listId = response.data.dashboard.list_id;

      // Store in Redux
      dispatch(setListId(listId));

      // Redirect to dashboard
      navigate("/dashContent");

      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error creating dashboard:", error);
      message.error("Failed to create dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        New Dashboard
      </Button>

      {/* Modal for Selecting a Project */}
      <Modal
        title="Select a Project for the Dashboard"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={createDashboard}
        confirmLoading={loading}
        okText="Create Dashboard"
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select a project"
          onChange={setSelectedProject}
          value={selectedProject}
        >
          {spaces.map((space) =>
            space.Lists.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name} (Space: {space.name})
              </Select.Option>
            ))
          )}
        </Select>
      </Modal>
    </div>
  );
};

export default DashboardCreator;
