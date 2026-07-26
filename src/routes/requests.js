const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type!!",
        });
      }

      const isPresentToUser=await User.findById(toUserId);
      if(!isPresentToUser){
        return res.status(404).json({
          message:"User not found."
        })
      }
      console.log(fromUserId,toUserId)
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send("Already exist connection request");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.fullName} has ${status} to ${isPresentToUser.fullName}`,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error while sending request :" + err.message);
    }
  },
);

module.exports = requestRouter;
