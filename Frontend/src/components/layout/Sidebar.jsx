import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ></path>
  </svg>
);

const PostIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const ListIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);

const BrowseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

const AdminIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197"
    ></path>
  </svg>
);

// --- Main Sidebar Component ---
const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors";
  const activeLinkStyle = "bg-green-100 text-green-700 font-semibold";

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900"
        >
          <div className="bg-green-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span>
            Eco<span className="text-green-500">Connect</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* --- DYNAMIC MENUS --- */}

        {/* Generator Section - Only show if user role is 'waste-generator' */}
        {user && user.role === "waste-generator" && (
          <div>
            <h3 className="px-4 mb-2 text-xs text-gray-400 uppercase tracking-wider">
              Generator Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/generator/overview"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <DashboardIcon /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/generator/post-waste"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <PostIcon /> Post New Waste
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/generator/my-listings"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <ListIcon /> My Listings
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Collector Section - Only show if user role is 'waste-collector' */}
        {user && user.role === "waste-collector" && (
          <div>
            <h3 className="px-4 mb-2 text-xs text-gray-400 uppercase tracking-wider">
              Collector Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/collector/browse"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <BrowseIcon /> Browse Listings
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Admin Section - Only show if user role is 'admin' */}
        {user && user.role === "admin" && (
          <div>
            <h3 className="px-4 mb-2 text-xs text-gray-400 uppercase tracking-wider">
              Admin Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/admin/overview"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <AdminIcon /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/users"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <UserIcon /> User Management
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* NGO Section - Only show if user role is 'ngo' */}
        {user && user.role === "ngo" && (
          <div>
            <h3 className="px-4 mb-2 text-xs text-gray-400 uppercase tracking-wider">
              NGO Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/ngo/overview"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <DashboardIcon /> Impact Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ngo/members"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <UserIcon /> Community Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ngo/auctions"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  <BrowseIcon /> Browse Auctions
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* User Profile / Logout Section */}
      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=0D8ABC&color=fff`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
