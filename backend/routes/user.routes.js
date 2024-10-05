import express from "express";
import User from "../models/user.model.js";
const userRoutes = express.Router();

userRoutes.post("/sign_up", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      hashedPassword: password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(`Signup Controller Error: ${error.message}`);
    res.json({ error: error.message }).status(400);
  }
});

export default userRoutes;
