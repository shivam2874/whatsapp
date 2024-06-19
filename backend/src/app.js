import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";

// Dotenv config
dotenv.config();

//Creating an Express Apps
const app = express();

//Adding Morgan Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet for security
app.use(helmet());

//Parse json request URL
app.use(express.json());

//Parse Json request Body
app.use(express.urlencoded({ extended: true }));

//Sanitize Request Data
app.use(mongoSanitize());

//compression
app.use(compression());

app.use(cors({ origin: "http://localhost:3000" }));

export default app;
