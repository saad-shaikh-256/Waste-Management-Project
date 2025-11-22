import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  updateUserStatus,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// --- NEW ADMIN ROUTES ---
// NEW (Fixes the crash)
router.get("/", protect, getUsers);
router.put("/:id/status", protect, admin, updateUserStatus);
router.put("/profile", protect, updateUserProfile);

export default router;
