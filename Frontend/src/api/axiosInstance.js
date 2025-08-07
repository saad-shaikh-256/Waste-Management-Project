import axios from "axios";

// This is the crucial line that makes your app flexible.
// When Netlify builds your project, it will inject the VITE_API_BASE_URL you set in its UI.
// When you run `npm run dev` on your computer, that variable won't exist, so it will fall back to the localhost URL.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

// Create a configured instance of axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// === REQUEST INTERCEPTOR ===
// This function will run BEFORE every single request is sent from your app.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // If the user is logged in (we have a token), add it to the request headers
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    // Handle any errors that occur during request setup
    return Promise.reject(error);
  }
);

export default axiosInstance;
