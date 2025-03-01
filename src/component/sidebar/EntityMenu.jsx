// EntityMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { getMenuOptions } from "../../utils/menuUtils";

const EntityMenu = ({ entityType, actions, onSelectSpace }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuOptions = getMenuOptions(entityType, actions);
  const menuRef = useRef();

  // Hide the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Three Dot Button */}
      <button
        onClick={() => setMenuVisible(!menuVisible)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
      {menuVisible && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {menuOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.action();
                  setMenuVisible(false);
                  onSelectSpace();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityMenu;
