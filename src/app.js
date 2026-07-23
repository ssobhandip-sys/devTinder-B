const express = require("express");
const bcrypt = require("bcrypt");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const { decrypt } = require("dotenv");
require("dotenv").config();

const app = express();
//to convert the json to jsavascript object so that server can understand
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("request body", req.body);
  const { firstName, lastName, emailId, password } = req.body;
  try {
    validateSignupData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash",passwordHash);
    const userData = { firstName, lastName, emailId, password: passwordHash };
    const Allow_Creates = [
      "firstName",
      "lastName",
      "emailId",
      "password"
    ];
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

app.post("/login", async (req, res) => {
  console.log("request body", req.body);
  const { emailId, password } = req.body;
  try {
    //validateSignupData(req);
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error(`Invalid Credentials!!`)
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.status(200).send("Login successfull!!")
    }else{
      throw new Error("Invalid Credentials!!")
    }
  } catch (error) {
    res.status(400).send("Error while login user :" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  console.log(userEmailId);
  try {
    const user = await User.find({ emailId: userEmailId });
    console.log(user);
    if (user.length === 0) {
      res.status(404).send("User not found!!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const Allow_Updates = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    console.log("1");
    const is_allowed_update = Object.keys(data).every((k) => {
      return Allow_Updates.includes(k);
    });
    console.log("2");
    if (!is_allowed_update) {
      throw new Error("User details update not allowed");
    }
    console.log("3");
    if (data.skills.length > 10) {
      throw new Error("Skills must be less than or equal to 10.");
    }
    console.log("4");
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log("update user", user);
    res.status(200).send("User updated successfully");
  } catch (err) {
    //console.log(err.message)
    res.status(400).send("User update failed :" + err.message);
  }
});

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
