import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define the base URL for your backend API
const API_URL = "https://eco-connect-backend.onrender.com/api/users/"; // <-- YOUR RENDER URL

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user info when the app loads
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const signup = async (fullName, email, password, role) => {
    try {
      const response = await axios.post(API_URL + "register", {
        fullName,
        email,
        password,
        role,
      });

      if (response.data) {
        // Save user info to localStorage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
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
      const response = await axios.post(API_URL + "login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
