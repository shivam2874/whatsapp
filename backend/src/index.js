import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";

//Environmet Variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT;

//Connection to MongoDB
mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Connected to Mongodb");
});

app.listen(PORT, () => {
  logger.info(`App running on: ${PORT}`);
});
