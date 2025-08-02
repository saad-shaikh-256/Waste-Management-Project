import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

// Dashboard Pages
import GeneratorOverview from "@/pages/dashboard/generator/GeneratorOverview";
import PostWaste from "@/pages/dashboard/generator/PostWaste";
import MyListings from "@/pages/dashboard/generator/MyListings";
import BrowseListings from "@/pages/dashboard/collector/BrowseListings"; // <<--- 1. MAKE SURE THIS IMPORT EXISTS
// ... import other dashboard pages as you create them
import UserManagement from "@/pages/dashboard/admin/UserManagement"; // Import the new page
import AdminOverview from "@/pages/dashboard/admin/AdminOverview"; // Import the new page

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Faking it for now
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* You can add other public pages here like /about, /contact */}
      </Route>

      {/* --- Auth Routes (No Layout) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* --- Protected Dashboard Routes --- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="generator/overview" replace />} />
        <Route path="generator/overview" element={<GeneratorOverview />} />
        <Route path="generator/post-waste" element={<PostWaste />} />
        <Route path="generator/my-listings" element={<MyListings />} />
        {/* Add collector and admin routes here later */}
        <Route path="collector/browse" element={<BrowseListings />} />{" "}
        {/* <<--- 2. MAKE SURE THIS LINE EXISTS AND IS CORRECT */}
        {/* Admin Routes */}
        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/overview" element={<AdminOverview />} />
      </Route>

      {/* --- 404 Not Found Route --- */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
