const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User =require("./models/user")
require("dotenv").config();

const app = express();
//to convert the json to jsavascript object so that server can understand
app.use(express.json());

app.post("/signup", async (req,res)=>{

  console.log("request body",req.body)

    const user=new User(req.body);
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
