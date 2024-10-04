import mongoose from "mongoose";
import validator from "validator";

/**@type {mongoose.Schema}*/
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      default: "",
      validate: {
        validator: validator.isMobilePhone,
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

/**@type {mongoose.Model}*/
export const User = new mongoose.model("User", userSchema);
