import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // 1. Import the DB connection function

// Import routes
import { userRoutes } from "./routes/userRoutes.js";

dotenv.config();

connectDB(); // 2. Connect to the database

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "Pong! The server is alive." });
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
