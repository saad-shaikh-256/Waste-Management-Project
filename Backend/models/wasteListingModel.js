import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  bidder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

const wasteListingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User", // Establishes the relationship
    },
    wasteType: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // URL to the uploaded image
    },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Claimed", "Completed"],
      default: "Available",
    },
    bids: [bidSchema], // An array of bids
  },
  {
    timestamps: true,
  }
);

const WasteListing = mongoose.model("WasteListing", wasteListingSchema);

export default WasteListing;
