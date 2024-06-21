import { createUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, status, picture } = req.body;

    const user = await createUser({
      name,
      email,
      password,
      status,
      picture,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  res.send("Hello from Login");
};

export const logout = async (req, res, next) => {
  res.send("Hello from Logout");
};

export const refreshToken = async (req, res, next) => {
  res.send("Hello from Refresh Token");
};
