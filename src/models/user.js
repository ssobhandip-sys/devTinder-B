const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      reuired: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      requird: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please give a strong password..");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo url is an invalid url");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DevTinder@Sob", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const passwordHash=user.password;
  const isPasswordValid=await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
