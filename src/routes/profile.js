const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateforgetPasswordData,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    console.log("Error while fetching the profile :", err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, you have edit your profile.`,
      data: loggedInUser,
    });
  } catch (err) {
    console.log("Error while edit profile details :", err.message);
    res.status(400).send("Error while edit profile details :"+ err.message)
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateforgetPasswordData(req)) {
      throw new Error("Invalid password change request");
    }
    const loggedInUser = req.user;
    const newPassword=req.body.password;
    const newpasswordHash=await bcrypt.hash(newPassword,10);
    loggedInUser['password']=newpasswordHash;

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, you have Changed your password.`,
      data: loggedInUser,
    });
  } catch (err) {
    console.log("Error while change password :", err.message);
    res.status(400).send("Error while change password :"+ err.message)
  }
});

module.exports = profileRouter;
