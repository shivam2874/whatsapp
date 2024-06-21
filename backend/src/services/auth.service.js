import createHttpError from "http-errors";
import User from "../models/user.model.js";
import validator from "validator";

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
  const checkDb = await User.findOne({ email });
  if (checkDb) {
    throw new createHttpError.Conflict("Email Address already Exists");
  }

  //Hash the password in the userModel

  const user = await new User({
    name,
    email,
    picture: picture || "https://avatar.iran.liara.run/public",
    status: status || "Hey there Am using Whatsapp",
    password,
  }).save();

  return user;
};
