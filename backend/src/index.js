import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";

//Environmet Variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//Handling MongoDB connection Errors
mongoose.connection.on("error", (err) => {
  logger.error(`Error in Connecting MongoDB:`, err);
  process.exit(1);
});

//Connection to MongoDB
mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Connected to Mongodb");
});

//App Listening on PORT
let server;
server = app.listen(PORT, () => {
  logger.info(`App running on: ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const uncaughtErrorHandler = (error) => {
  logger.error(error);
  exitHandler;
};

process.on("uncaughtException", uncaughtErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
});
