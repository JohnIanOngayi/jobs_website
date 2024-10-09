import express from "express";
import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
const jobRoutes = express.Router();

jobRoutes.get("/", (req, res) => {});

jobRoutes.post("/", async (req, res) => {
  try {
    const { title, type, description, country, location, company_id } =
      req.body;
    const company = await Company.findById(company_id);
    if (!company) {
      throw new Error("Invalid Company ID");
    }
    const newJob = await Job.create({
      title,
      type,
      description,
      country,
      location,
      company,
    });
    await newJob.save();
    res.json(newJob);
  } catch (error) {
    console.error(`Post Jobs Controller Error: ${error.message}`);
    res.json({ error: error.message }).status(400);
  }
});

export default jobRoutes;
