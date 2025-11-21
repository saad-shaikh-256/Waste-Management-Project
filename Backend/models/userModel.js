import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["waste-generator", "waste-collector", "ngo", "admin"],
    },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Suspended"],
      default: "Pending",
    },
    // --- NEW FIELDS ---
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
