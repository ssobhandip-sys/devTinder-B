const express = require("express");
require("dotenv").config();
const app = express();
//wild card route


//handle auth middleware for all Get,Post ... requests
app.use("/admin",(req,res,next)=>{
    console.log("admin authorization is implemented")
    const token="xyzzzzzz"
    const isAdminAuthorize=token==="xyz";
    if(!isAdminAuthorize){
        res.status(401).send("admin is not authorized")
    }else{
        next();
    }
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
