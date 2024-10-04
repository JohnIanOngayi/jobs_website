import express from "express";
import { connectMongoDB } from "./backend/db/connectMongoDB.js";
import dotenv from "dotenv";

// variables
dotenv.config();

const PORT = 3000;

let DB_URI;
if (process.env.ENVIRONMENT === "dev") {
  DB_URI = "mongodb://127.0.0.1:27017/jobs_website";
} else if (process.env.ENVIRONMENT === "prod") {
  DB_URI = process.env.DB_URI;
}

const app = express();

//Middleware for parsing req.params and req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/plain" });
  res.send("GET / working");
});

connectMongoDB(DB_URI, app, 3000);
