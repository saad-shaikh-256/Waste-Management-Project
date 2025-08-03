import React from "react";
import { Outlet } from "react-router-dom"; // This is where nested routes will render
import Sidebar from "../components/layout/Sidebar"; // We will create this next

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-poppins">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Main Content Area - Takes the remaining space and is scrollable */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* The content of your specific dashboard pages (e.g., GeneratorOverview) will appear here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
