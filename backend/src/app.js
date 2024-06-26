import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

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

//Using Cookie Parser
app.use(cookieParser());

//compression
app.use(compression());

//api/v1 Routess
app.use("/api/v1/", routes);

app.use(cors({ origin: "http://localhost:3000" }));

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This Route does Not Exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

export default app;
