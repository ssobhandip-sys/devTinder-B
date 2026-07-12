const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User =require("./models/user")
require("dotenv").config();
const app = express();


app.post("/signup", async (req,res)=>{

    const user=new User({
        firstName:"SobhandipS",
        lastName:"Sam",
        emailId:"s.sam@gmail.com",
        password:"admin123"
    })
    await user.save();
    res.send("User added successfully!!")
    try {
        await user.save();
        res.status(200).send("User added successfully!!")
    } catch (error) {
        res.status(400).send("Error in saving user :" + error.message)
    }
})


connectDb()
  .then(() => {
    console.log("database connected Successfully!!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("database not connected for error", err);
  });
