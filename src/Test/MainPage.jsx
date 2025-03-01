import Sidebar from "./Sidebar";
import Task from "./Task";

const MainPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed width */}
      <aside className="w-64 bg-blue-600 p-4 text-white">
        <Sidebar />
      </aside>

      {/* Main content - Must take the remaining space */}
      <main className="flex-1 flex">
        {/* Tasks should take the full width of remaining space */}
        <div className="flex-1 p-4 bg-gray-100">
          <Task />
        </div>
      </main>
    </div>
  );
};


export default MainPage;
