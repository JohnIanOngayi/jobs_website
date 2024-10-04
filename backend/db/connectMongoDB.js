import mongoose from "mongoose";
import express from "express";

/**
 * connects to MongoDB using mongoose
 * @param {string} uri - MongoDB connection string
 * @param {express.Express} app - Express server
 * @param {number} app_port - Express api port for app
 */
export const connectMongoDB = (uri, app, app_port) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Successfully connected to db");

      app.listen(app_port, () => {
        console.log(`Server is listening on port ${app_port}`);
      });
    })
    .catch((error) => {
      console.error(`db connection error: ${error.message}`);
    });
};
