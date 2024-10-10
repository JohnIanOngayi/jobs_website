import express from "express";
import User from "../models/user.model.js";
const userRoutes = express.Router();

// Get all users
userRoutes.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(`GET all users Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user by ID
userRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`GET user by id Controller Error: ${error.message}`);
    res.status(400).json({ error: "Invalid User ID" });
  }
});

// Create a new user (sign up)
userRoutes.post("/sign_up", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate request data
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists` });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      hashedPassword: password,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Signup Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRoutes;
