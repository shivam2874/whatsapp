import { UserModel } from "../models/index.js";
import createHttpError from "http-errors";

export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fill all fields");
  return user;
};
