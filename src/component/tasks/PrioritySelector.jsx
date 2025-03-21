import { useState } from "react";

const PrioritySelector = ({ onPriorityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Priority");

  const priorities = ["Low", "Medium", "High"];

  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    onPriorityChange(priority);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Priority Button */}
      <button
        className="px-4 py-2 border rounded-lg flex items-center gap-2 bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🚩 {selectedPriority}</span>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
          {priorities.map((priority) => (
            <li
              key={priority}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(priority)}
            >
              {priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrioritySelector;
