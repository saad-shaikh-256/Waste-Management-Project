/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      localStorage.removeItem("userInfo");
    } finally {
      setLoading(false);
    }
  }, []);

  // --- NEW HELPER FUNCTION ---
  // This allows other components to update the user state without logging in again
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const signup = async (fullName, email, password, role) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        fullName,
        email,
        password,
        role,
      });

      if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
      return { success: false, message: "Registration failed unexpectedly." };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred during registration.",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
      return { success: false, message: "Login failed unexpectedly." };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "An error occurred during login.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateUser, // Export this!
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
