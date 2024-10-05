import mongoose from "mongoose";
import validator from "validator";

/**@type {mongoose.Schema}*/
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    hashedPassword: {
      type: String,
      minLength: 8,
      required: true,
    },

    phone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: true,
    },
  },
  { timestamps: true },
);

/**@type {mongoose.Model}*/
const Company = new mongoose.model("Company", companySchema);

export default Company;
