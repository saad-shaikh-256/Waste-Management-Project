import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    // 1. Check if user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user in the database
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // 4. If user was created successfully, send back user data and a token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if a user with the given email exists in the database
    const user = await User.findOne({ email });

    // 2. If user exists, compare the provided password with the hashed password in the DB
    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match! Send back user data and a new token.
      res.status(200).json({
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // User not found or password does not match
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { registerUser, loginUser };
