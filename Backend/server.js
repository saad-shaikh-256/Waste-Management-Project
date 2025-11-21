import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // Import path
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import wasteListingRoutes from "./routes/wasteListingRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("This origin is not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "Pong! The server is alive." });
});

app.use("/api/users", userRoutes);
app.use("/api/listings", wasteListingRoutes);

// --- MAKE UPLOADS FOLDER STATIC ---
// This allows http://localhost:5001/uploads/image-123.jpg to work
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
