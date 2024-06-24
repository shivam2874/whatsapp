import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  const { name, email, password, picture, status } = userData;

  //check all fields
  if (!email || !password || !name) {
    throw createHttpError.BadRequest("Please fill all fields ");
  }

  //check Name Length
  if (
    !validator.isLength(name, {
      min: 3,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure you name is between 3 to 16 characters"
    );
  }

  //Check status Length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Status characters should not exceed 64 characters"
    );
  }

  //Validate Email
  if (!validator.isEmail(email)) {
    throw new createHttpError.BadRequest("Please provide a Valid Email");
  }

  //Check DB
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw new createHttpError.Conflict("Email Address already Exists");
  }

  //Hash the password in the userModel

  const user = await new UserModel({
    name,
    email,
    picture: picture || "https://avatar.iran.liara.run/public",
    status: status || "Hey there Am using Whatsapp",
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //Check if User Exists
  if (!user) throw createHttpError.NotFound("Invalid Credentials");

  //Compare Passwords
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createHttpError.NotFound("Invalid Credentials");

  //Everything is fine then return
  return user;
};
