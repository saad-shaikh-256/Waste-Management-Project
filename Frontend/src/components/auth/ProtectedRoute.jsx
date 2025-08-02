import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // For now, we are faking the authentication status.
  // In the future, this will check for a token in localStorage or a cookie.
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components (e.g., DashboardLayout)
  return children;
};

export default ProtectedRoute;
