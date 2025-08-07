import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// --- CORS CONFIGURATION ---
const corsOptions = {
  origin: process.env.FRONTEND_URL, // This is the crucial line
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions)); // Use the configured options
// --- END OF CORS CONFIGURATION ---

app.use(express.json());

// ... rest of your server.js file ...
app.get("/api/ping", (req, res) => {
  /* ... */
});
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
