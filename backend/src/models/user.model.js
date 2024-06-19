import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Email is Required"],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      unique: [true, "Email-Id Already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please Provide an Valid Email"],
    },
    picture: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    status: {
      type: String,
      default: "Hey, there am using whatsapp",
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [6, "Password should atleast have 6 characters"],
      maxLength: [
        128,
        "Password characters should not excedd more than 16 Characters",
      ],
    },
  },
  { collection: "users", timeStamps: true }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
