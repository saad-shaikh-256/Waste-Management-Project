import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";
import { AuthProvider } from "@/context/AuthContext"; // 1. Import AuthProvider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* 2. Wrap the App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
