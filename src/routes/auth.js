const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  console.log("request body", req.body);
  const { firstName, lastName, emailId, password } = req.body;
  try {
    validateSignupData(req);
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = { firstName, lastName, emailId, password: passwordHash };
    const Allow_Creates = ["firstName", "lastName", "emailId", "password"];
    const is_allow_create = Object.keys(userData).every((k) => {
      return Allow_Creates.includes(k);
    });
    if (!is_allow_create) {
      throw new Error("User creation is not allowed");
    }

    const user = new User(userData);
    await user.save();
    res.status(200).send("User added successfully!!");
  } catch (error) {
    res.status(400).send("Error in saving user :" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("request body", req.body);
  const { emailId, password } = req.body;
  try {
    //validateSignupData(req);
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(`Invalid Credentials!!`);
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("Login successfull!!");
    } else {
      throw new Error("Invalid Credentials!!");
    }
  } catch (error) {
    res.status(400).send("Error while login user :" + error.message);
  }
});

module.exports = authRouter;
