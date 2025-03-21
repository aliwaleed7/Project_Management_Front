import { useNavigate } from "react-router-dom";

const DashboardButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-black hover:text-gray-700 transition"
      onClick={() => navigate("/dash")}
    >
      <span className="inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3 13h2V7H3v6zm4 0h2V3H7v10zm4 0h2V9h-2v4z" />
        </svg>
      </span>
      <span className="font-medium text-lg">Dashboards</span>
    </div>
  );
};

export default DashboardButton;
