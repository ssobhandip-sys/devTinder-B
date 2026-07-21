const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
require("dotenv").config();

const app = express();
//to convert the json to jsavascript object so that server can understand
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("request body", req.body);

  const user = new User(req.body);
  await user.save();
  res.send("User added successfully!!");
  try {
    await user.save();
    res.status(200).send("User added successfully!!");
  } catch (error) {
    res.status(400).send("Error in saving user :" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  console.log(userEmailId)
  try {
    const user =await User.find({ emailId: userEmailId });
    console.log(user)
    if (user.length === 0) {
      res.status(404).send("User not found!!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/feed", async (req,res)=>{
  try {
    const users=await User.find({});
    res.send(users)
  } catch (error) {
    res.status(500).send('something went wrong')
  }
})

app.delete("/user",async (req,res)=>{
  const userId=req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully")
  } catch (err) {
    res.status(400).send("something went wrong!!")
  }

})

app.patch("/user",async (req,res)=>{
  const userId=req.body.userId;
  const data =req.body;
  try {
    const user= await User.findByIdAndUpdate(userId,data,{returnDocument:"after"});
    console.log("update user",user)
    res.status(200).send("User updated successfully")
  } catch (err) {
    res.status(400).send("something went wrong!!")
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
