import express from "express";
import {
  createListing,
  getListings,
  getMyListings,
  updateListing,
  deleteListing,
} from "../controllers/wasteListingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getListings);

// Protected routes
router.post("/", protect, createListing);
router.get("/mylistings", protect, getMyListings);

// --- NEW PROTECTED ROUTES for updating and deleting ---
// These routes accept a dynamic ID in the URL (e.g., /api/listings/60d21b4667d0d8992e610c85)
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

export default router;
