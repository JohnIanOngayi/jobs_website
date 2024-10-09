import express from "express";
import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
const jobRoutes = express.Router();

jobRoutes.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error(`GET all jobs Controller Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

jobRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (job) return res.status(200).json(job);
  } catch (error) {
    console.error(`GET job by id Controller Error: ${error.message}`);
    return res.status(404).json({ error: `Invalid Company ID` });
  }
});

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
