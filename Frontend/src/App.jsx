import { StrictMode } from "react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

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
import Profile from "@/pages/dashboard/Profile"; // --- IMPORT PROFILE ---

// NGO Imports
import NgoOverview from "@/pages/dashboard/ngo/NgoOverview";
import CommunityMembers from "@/pages/dashboard/ngo/CommunityMembers";
import NgoAuctions from "@/pages/dashboard/ngo/NgoAuctions";
import ListingDetailPage from "@/pages/dashboard/ngo/ListingDetailPage";
import TransactionHistory from "./pages/dashboard/admin/TransactionHistory";

const DashboardHome = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case "waste-generator":
      return <Navigate to="generator/overview" replace />;
    case "waste-collector":
      return <Navigate to="collector/browse" replace />;
    case "admin":
      return <Navigate to="admin/overview" replace />;
    case "ngo":
      return <Navigate to="ngo/overview" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          {/* --- NEW PROFILE ROUTE --- */}
          <Route path="profile" element={<Profile />} />

          <Route path="generator/overview" element={<GeneratorOverview />} />
          <Route path="generator/post-waste" element={<PostWaste />} />
          <Route path="generator/my-listings" element={<MyListings />} />
          <Route path="collector/browse" element={<BrowseListings />} />
          <Route path="admin/overview" element={<AdminOverview />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/transactions" element={<TransactionHistory />} />
          <Route path="ngo/overview" element={<NgoOverview />} />
          <Route path="ngo/members" element={<CommunityMembers />} />
          <Route path="ngo/auctions" element={<NgoAuctions />} />
          <Route path="ngo/listings/:id" element={<ListingDetailPage />} />
        </Route>

        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
