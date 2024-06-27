import express from "express";
import trimrequest from "trim-request";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(trimrequest.all, register);
router.route("/login").post(trimrequest.all, login);
router.route("/logout").post(trimrequest.all, logout);
router.route("/refreshtoken").post(trimrequest.all, refreshToken);
router.route("/testAuthMiddleware").get(trimrequest.all);

export default router;
