const express = require("express");
const {adminAuth,userAuth}=require("./middlewares/auth")
require("dotenv").config();
const app = express();
//wild card route


//handle auth middleware for all Get,Post ... requests
app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("user data fetched")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data send")
})

app.get("/admin/deleteUse",(req,res)=>{
    res.send("User deleted")
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});
