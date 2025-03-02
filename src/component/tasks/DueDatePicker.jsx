import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Date } from "react-icons/bs";

const DueDatePicker = ({ onDateChange }) => {
  const [dueDate, setDueDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setDueDate(date);
    onDateChange(date);
    setIsOpen(false); // Close the pop-up after selecting a date
  };

  return (
    <div>
      {/* Due Date Button */}
      <button
        className="flex inset-0 items-center space-x-1 border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <BsCalendar2Date className="text-gray-500" />
        <span>{dueDate ? dueDate.toLocaleString() : "Due Date"}</span>
      </button>

      {/* Modal for Date Picker */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-50">
            <h2 className="text-lg font-semibold mb-2">
              Select Due Date & Time
            </h2>
            <DatePicker
              selected={dueDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              inline
            />
            <button
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueDatePicker;
