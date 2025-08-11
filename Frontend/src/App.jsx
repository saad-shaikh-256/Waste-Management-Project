import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Auth Component
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

// Dashboard Pages
import GeneratorOverview from "@/pages/dashboard/generator/GeneratorOverview";
import PostWaste from "@/pages/dashboard/generator/PostWaste";
import MyListings from "@/pages/dashboard/generator/MyListings";
import BrowseListings from "@/pages/dashboard/collector/BrowseListings";
import AdminOverview from "@/pages/dashboard/admin/AdminOverview";
import UserManagement from "@/pages/dashboard/admin/UserManagement";

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      {/* These routes are accessible to everyone */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* --- Auth Routes (No Layout) --- */}
      {/* These routes are for logging in and signing up */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* --- Protected Dashboard Routes --- */}
      {/* This is the crucial part. All routes inside this block will be protected. */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Default dashboard route: Redirects to the correct overview based on role */}
        {/* We will add logic here later. For now, it goes to generator overview. */}
        <Route index element={<Navigate to="generator/overview" replace />} />

        {/* Generator Routes */}
        <Route path="generator/overview" element={<GeneratorOverview />} />
        <Route path="generator/post-waste" element={<PostWaste />} />
        <Route path="generator/my-listings" element={<MyListings />} />

        {/* Collector Routes */}
        <Route path="collector/browse" element={<BrowseListings />} />

        {/* Admin Routes */}
        <Route path="admin/overview" element={<AdminOverview />} />
        <Route path="admin/users" element={<UserManagement />} />
      </Route>

      {/* --- 404 Not Found Route --- */}
      {/* This will catch any URL that doesn't match the routes above */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
