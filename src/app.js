const express=require("express");
require('dotenv').config();
const app =express();
//wild card route


app.use("/test",(req,res)=>{
    res.send("Hello rom server 3000")
})

app.get("/user",(req,res)=>{
    res.send("user data send")
})

app.post("/user",(req,res)=>{
    res.send("data saved to the db")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port ${process.env.PORT}`)
})
