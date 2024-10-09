import express from "express";
import Company from "../models/company.model.js";
const companyRoutes = express.Router();

companyRoutes.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    console.error(`GET all companies Controller Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

companyRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (company) return res.status(200).json(company);
  } catch (error) {
    console.error(`GET company by id Controller Error: ${error.message}`);
    return res.status(404).json({ error: `Invalid Company ID` });
  }
});

companyRoutes.post("/", async (req, res) => {
  try {
    const { name, description, email, password, phone } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res
        .status(400)
        .json({ error: `Company with email ${email} already Exists` });
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
    res.status(400).json({ error: error.message });
  }
});

export default companyRoutes;
