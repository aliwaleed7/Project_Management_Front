import DashboardButton from "./DashboardButton";
import DashboardCreator from "./newDashbut";

const DashboardHeader = () => {

  return (
    <div className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg mx-2 mt-2">
      {/* Left Section - Dashboards Button */}
      <DashboardButton />

      {/* Right Section - Create Dash Button & Search */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-1 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Create Dash Button */}
        <DashboardCreator />
      </div>
    </div>
  );
};

export default DashboardHeader;
