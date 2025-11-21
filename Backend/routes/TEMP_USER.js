import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  placeBid,
  getMyListings,
  updateListing,
  deleteListing,
  markAsCollected, // Import this
} from "../controllers/wasteListingController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getListings);

// Protected routes
router.post("/", protect, upload.single("image"), createListing);
router.get("/mylistings", protect, getMyListings);

// Specific ID Routes
router.get("/:id", protect, getListingById);
router.post("/:id/bid", protect, placeBid);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

// --- NEW ROUTE FOR COLLECTORS ---
router.put("/:id/collect", protect, markAsCollected);

export default router;
