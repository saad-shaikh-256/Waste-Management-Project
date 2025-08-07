import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance'; // Import our new configured instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const signup = async (fullName, email, password, role) => {
    try {
      // Use the new instance. We only need the specific endpoint path.
      const response = await axiosInstance.post('/users/register', {
        fullName,
        email,
        password,
        role,
      });

      if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed.' };
    }
  };

  const login = async (email, password) => {
    try {
      // Use the new instance here as well.
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};