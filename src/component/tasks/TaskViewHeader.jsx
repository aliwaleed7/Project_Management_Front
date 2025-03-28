import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { FaThLarge } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { HiOutlineChartBar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const TaskViewHeader = ({ projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center border-b p-3">
        <div className="flex space-x-4 text-gray-600 text-lg ">
          <div
            className="flex items-center cursor-pointer hover:text-black"
            onClick={() => navigate("/board")}
          >
            <FaThLarge className="mr-1" />
            Board
          </div>
          
          <div
            className="flex items-center cursor-pointer hover:text-black"
            onClick={() => navigate("/main")}
          >
            <BsListTask className="mr-1" />
            List
          </div>
          {/* <div className="flex items-center cursor-pointer hover:text-black">
            <HiOutlineChartBar className="mr-1" /> Gantt
          </div> */}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
      />
    </>
  );
};

export default TaskViewHeader;
