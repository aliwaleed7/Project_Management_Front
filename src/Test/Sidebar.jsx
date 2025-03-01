const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="p-2 hover:bg-blue-700 cursor-pointer">Dashboard</li>
        <li className="p-2 hover:bg-blue-700 cursor-pointer">Tasks</li>
        <li className="p-2 hover:bg-blue-700 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
