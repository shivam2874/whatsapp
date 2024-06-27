import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, status, picture } = req.body;

    const newUser = await createUser({
      name,
      email,
      password,
      status,
      picture,
    });
    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 10000, //30 Days
    });
    // console.table({ access_token, refresh_token });

    res.json({
      message: "register sucessful.",

      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        picture: newUser.picture,
        status: newUser.status,
        access_token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 10000, //30 Days
    });
    // console.table({ access_token, refresh_token });

    res.json({
      message: "Logged In sucessfully.",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        picture: user.picture,
        status: user.status,
        access_token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/v1/auth/refreshtoken" });
    res.json({
      message: "Logged out Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) throw createHttpError.Unauthorized("Please Login");

    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await findUser(check.userId);

    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        picture: user.picture,
        status: user.status,
        access_token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
