const Task = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul>
        <li className="p-2 border-b">✅ Complete project setup</li>
        <li className="p-2 border-b">📅 Schedule team meeting</li>
        <li className="p-2">✍️ Write project documentation</li>
      </ul>
    </div>
  );
};

export default Task;
