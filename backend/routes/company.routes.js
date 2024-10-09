import express from "express";
import Company from "../models/company.model.js";
const companyRoutes = express.Router();

companyRoutes.post("/", async (req, res) => {
  try {
    const { name, description, email, password, phone } = req.body;
    const newCompany = await Company.create({
      name,
      description,
      email,
      hashedPassword: password,
      phone,
    });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(`POST Company Controller Error: ${error.message}`);
    res.json({ error: error.message }).status(400);
  }
});

export default companyRoutes;
