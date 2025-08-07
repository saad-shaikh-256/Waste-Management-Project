import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database as soon as the application starts
connectDB();

const app = express();

// --- CORS CONFIGURATION ---
// This setup allows your frontend (specified in the .env file) to make requests to this backend.
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---

// --- MIDDLEWARE ---
// This allows the server to accept and parse JSON in the body of requests (like in login/register)
app.use(express.json());

// --- ROUTES ---
// A simple test route to confirm the server is running and reachable
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "Pong! The server is alive and well." });
});

// All routes starting with /api/users will be handled by the userRoutes file
app.use("/api/users", userRoutes);

// --- SERVER INITIALIZATION ---
// Use the port from the .env file, or default to 5001 if it's not defined
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
