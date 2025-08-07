import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // Assumes userRoutes.js uses "export default"

dotenv.config();
connectDB();

const app = express();

// --- DYNAMIC CORS CONFIGURATION ---
// This is the most flexible and professional setup.

// 1. Create a list of allowed origins.
const allowedOrigins = [
  process.env.FRONTEND_URL, // This will be 'https://eco-con.netlify.app' on Render
  "http://localhost:5173", // This is for your local development
];

const corsOptions = {
  origin: (origin, callback) => {
    // The 'origin' is the URL of the site making the request.
    // We check if this origin is in our allowed list.
    // We also allow requests with no origin (like from Postman/Thunder Client).
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("This origin is not allowed by CORS")); // Block the request
    }
  },
  optionsSuccessStatus: 200,
};

// 2. Use the configured options.
app.use(cors(corsOptions));

// --- END OF CORS CONFIGURATION ---

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "Pong! The server is alive." });
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
