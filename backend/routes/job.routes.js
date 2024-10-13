import express from "express";
import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
const jobRoutes = express.Router();

// Get all jobs
jobRoutes.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error(`GET all jobs Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get job by ID
jobRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(`GET job by id Controller Error: ${error.message}`);
    res.status(400).json({ error: "Invalid Job ID" });
  }
});

// Create a new job
jobRoutes.post("/", async (req, res) => {
  try {
    const {
      title,
      salaryRange,
      type,
      description,
      country,
      location,
      company_id,
    } = req.body;

    // Validate request data
    if (
      !title ||
      !type ||
      !description ||
      !country ||
      !location ||
      !company_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await Company.findById(company_id);
    if (!company) {
      return res.status(400).json({ error: "Invalid Company ID" });
    }

    const newJob = new Job({
      title,
      type,
      description,
      country,
      location,
      company,
      salaryRange: salaryRange || "",
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(`Post Jobs Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a job
jobRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Job.deleteOne({ _id: id });
    if (result.deletedCount === 1)
      return res.status(204).json({ success: "Successfully Deleted Job" });
    else return res.status(400).json({ error: "Invalid Job ID" });
  } catch (error) {
    console.error(`Delete Job Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a job
jobRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    description,
    salaryRange,
    country,
    location,
    company_id,
  } = req.body;

  // Validate request data
  if (!title || !type || !description || !country || !location || !company_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const company = await Company.findById(company_id);
    if (!company) {
      return res.status(400).json({ error: "Invalid Company ID" });
    }

    job.title = title;
    job.type = type;
    job.description = description;
    job.country = country;
    job.location = location;
    job.company = company;
    job.salaryRange = salaryRange || "";

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error(`Update Job Controller Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default jobRoutes;
