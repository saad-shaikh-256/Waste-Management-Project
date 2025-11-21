import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Add Token
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("userInfo");
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
