const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user=req.user;
    console.log("request send successfully!!")
    res.send(`${user.firstName} has sent connection request`)
})

module.exports = requestRouter;
