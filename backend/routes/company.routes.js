import express from "express";
import Company from "../models/company.model.js";
const companyRoutes = express.Router();

// GET all companies
companyRoutes.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    console.error(`GET all companies Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET company by ID
companyRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(`GET company by id Controller Error: ${error.message}`);
    res.status(400).json({ error: "Invalid Company ID" });
  }
});

// POST create a new company
companyRoutes.post("/", async (req, res) => {
  try {
    const { name, description, email, password, phone } = req.body;

    // Validation
    if (!name || !description || !email || !password || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: `Company with email ${email} already exists` });
    }

    const newCompany = new Company({
      name,
      description,
      email,
      hashedPassword: password, // Assuming password is hashed before saving
      phone,
    });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(`POST Company Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update company by ID
companyRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, email, password, phone } = req.body;

    // Validate request data
    if (!name || !description || !email || !password || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    company.name = name;
    company.description = description;
    company.email = email;
    company.hashedPassword = password;
    company.phone = phone;

    await company.save();
    res.status(200).json(company);
  } catch (error) {
    console.error(`PUT company by id Controller Error: ${error.message}`);
    res.status(400).json({ error: "Invalid Company ID" });
  }
});

// DELETE company by ID
companyRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    await company.remove();
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(`DELETE company by id Controller Error: ${error.message}`);
    res.status(400).json({ error: "Invalid Company ID" });
  }
});

export default companyRoutes;
