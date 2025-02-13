const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//User Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, fullName, gender, dob, country } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !fullName ||
      !gender ||
      !dob ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      fullName,
      gender,
      dob,
      country,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Stored Hashed Password:", user.password); // Debugging

    // ✅ Compare hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isMatch = hashedPassword.localeCompare(user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Use process.env.JWT_SECRET
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search user by username or email
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Search user by username or email (case insensitive)
    const user = await User.findOne({
      $or: [{ username: query }, { email: query }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password from response
    const { password, ...userDetails } = user.toObject();
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error searching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
