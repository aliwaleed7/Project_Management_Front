import { useState } from "react";
import DueDatePicker from "./DueDatePicker";
import AssignTask from "../../utils/AssignTask";
import PrioritySelector from "./PrioritySelector";
import { Button, Modal, Input, message } from "antd";

const AddTaskModal = ({ isOpen, onClose, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [priority, setPriority] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You are not authorized!");
      return;
    }

    if (!title.trim()) {
      message.warning("Task title is required!");
      return;
    }

    const taskData = {
      title,
      description: description || "",
      list_id: projectId,
      assigned_to: assignee || null,
      status: "To Do",
      priority: priority || "Low",
      due_date: deadline || null,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/task/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Task created successfully!");
        setTitle("");
        setDescription("");
        setAssignee(null);
        setPriority(null);
        setDeadline(null);
        onClose();
      } else {
        message.error(data.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      message.error("An error occurred while creating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Task"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Create Task"
      cancelText="Cancel"
    >
      <Input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input.TextArea
        placeholder="Task Description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex flex-wrap gap-3 mt-3">
        <DueDatePicker onDateChange={setDeadline} />
        <AssignTask projectId={projectId} onSelectUser={setAssignee} />
        <PrioritySelector onPriorityChange={setPriority} />
      </div>
    </Modal>
  );
};

export default AddTaskModal;
