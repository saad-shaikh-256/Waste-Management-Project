import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  bidder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

const wasteListingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // The Seller (Generator)
    },
    // --- NEW FIELD ---
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The Buyer (Collector/NGO)
    },
    wasteType: { type: String, required: true },
    quantity: { type: String, required: true },
    location: { type: String, required: true },
    pickupDate: { type: Date },
    description: { type: String },
    image: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Claimed", "Completed"],
      default: "Available",
    },
    bids: [bidSchema],
  },
  {
    timestamps: true,
  }
);

const WasteListing = mongoose.model("WasteListing", wasteListingSchema);

export default WasteListing;
