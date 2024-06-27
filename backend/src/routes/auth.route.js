import express from "express";
import trimrequest from "trim-request";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(trimrequest.all, register);
router.route("/login").post(trimrequest.all, login);
router.route("/logout").post(trimrequest.all, logout);
router.route("/refreshtoken").post(trimrequest.all, refreshToken);
router
  .route("/testAuthMiddleware")
  .get(trimrequest.all, authMiddleware, (req, res) => {
    res.send("Hello from Testing AUth");
  });

export default router;
