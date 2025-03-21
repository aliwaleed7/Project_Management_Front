import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Select, message } from "antd";

const DashboardCreator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch spaces and their projects
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/space/spaces-with-projects",
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
        { dash_name: "New Dashboard", list_id: selectedProject },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Dashboard created successfully!");
      console.log(response.data);
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
