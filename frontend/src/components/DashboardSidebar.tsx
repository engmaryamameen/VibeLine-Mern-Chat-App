import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, Globe, Video, Calendar } from "lucide-react";
import Avatar from "./Avatar";

const DashboardSidebar = (): JSX.Element => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const isMessagesActive = isActive("/");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 w-[54px] h-screen bg-white flex flex-col items-center py-4 z-[1000] shadow-sm">
      {/* Connections Icon - Interlocking Circles */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg mb-2 hover:bg-gray-100 transition-all duration-200"
        title="Connections"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="16" r="8" stroke="#27AE60" strokeWidth="2" fill="none" />
          <circle cx="20" cy="16" r="8" stroke="#27AE60" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {/* Profile Picture */}
      {authUser && (
        <Link
          to="/profile"
          className="mb-4 hover:opacity-80 transition-all duration-200 flex items-center justify-center"
        >
          <Avatar
            fullName={authUser.fullName || ""}
            profilePic={authUser.profilePic}
            size={32}
            className="border-2 border-black shadow-sm"
          />
        </Link>
      )}

      {/* Separator Line */}
      <div className="w-9 h-px bg-gray-300 mb-4 mx-auto" />

      {/* Navigation Icons */}
      <div className="flex flex-col items-center flex-1">
        {/* Globe Icon */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg mb-3 hover:bg-gray-100 transition-all duration-200"
          title="Global"
        >
          <Globe className="w-[18px] h-[18px] text-[#27AE60]" />
        </button>

        {/* Messages/Chat Icon - Active/Highlighted */}
        <Link
          to="/"
          className={`w-[42px] h-[42px] flex items-center justify-center rounded-2xl mb-3 transition-all duration-200 ${
            isMessagesActive
              ? "bg-[#27AE60] text-white shadow-sm"
              : "hover:bg-gray-100"
          }`}
          title="Messages"
        >
          <svg
            width="18"
            height="13"
            viewBox="0 0 18 12.46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="17"
              height="9.46"
              rx="2"
              fill={isMessagesActive ? "white" : "none"}
              stroke="#27AE60"
              strokeWidth="1"
            />
            <path
              d="M 3 9.96 L 5.5 12.46 L 5.5 9.96 Z"
              fill={isMessagesActive ? "white" : "none"}
              stroke="#27AE60"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <line
              x1="3"
              y1="4"
              x2="15"
              y2="4"
              stroke="#27AE60"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1="3"
              y1="6.5"
              x2="12"
              y2="6.5"
              stroke="#27AE60"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Video Camera Icon */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg mb-3 hover:bg-gray-100 transition-all duration-200"
          title="Video Calls"
        >
          <Video className="w-5 h-5 text-[#27AE60]" />
        </button>

        {/* Music Note Icon */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg mb-3 hover:bg-gray-100 transition-all duration-200"
          title="Music"
        >
          <svg
            width="15.03"
            height="17"
            viewBox="0 0 15.03 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="6" cy="12" rx="3.5" ry="2.5" fill="#27AE60" />
            <rect x="8.5" y="2" width="1.5" height="10" fill="#27AE60" />
            <path
              d="M 10 2 Q 12 3 13.5 4 Q 15 5 14.5 7 Q 14 9 12 8 Q 10 7 10 5 Z"
              fill="#27AE60"
            />
          </svg>
        </button>

        {/* Calendar Icon */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg mb-3 hover:bg-gray-100 transition-all duration-200"
          title="Calendar"
        >
          <Calendar className="w-[18px] h-[18px] text-[#27AE60]" />
        </button>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center">
        {/* Settings Icon */}
        <Link
          to="/settings"
          className={`w-10 h-10 flex items-center justify-center rounded-lg mb-3 transition-all duration-200 ${
            isActive("/settings") ? "bg-gray-100" : "hover:bg-gray-100"
          }`}
          title="Settings"
        >
          <Settings className="w-[16.6px] h-[18px] text-[#27AE60]" />
        </Link>

        {/* Logout/Exit Icon */}
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200"
          title="Logout"
        >
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 16.98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 4 2 L 16 2 L 16 14.98 L 4 14.98"
              stroke="#718096"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="4"
              y1="8.49"
              x2="1"
              y2="8.49"
              stroke="#718096"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 1 8.49 L 3.5 6.49 M 1 8.49 L 3.5 10.49"
              stroke="#718096"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

