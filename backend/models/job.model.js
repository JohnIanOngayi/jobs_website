import mongoose from "mongoose";
import validator from "validator";
import Company from "./company.model";

/**@type {mongoose.Schema}*/
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Remote", "Onsite", "Hybrid"],
    },

    description: {
      type: String,
      required: true,
    },

    salaryRange: {
      type: String,
      default: "Not Specified",
      enum: ["Not Specified"], //TODO: add more enums
    },

    country: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true },
);

/**@type {mongoose.Model}*/
const Job = new mongoose.model("Job", jobSchema);

export default Job;
