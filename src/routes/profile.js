const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  console.log("/profile");
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    console.log("Error while fetching the profile", err.message);
  }
});

module.exports = profileRouter;
