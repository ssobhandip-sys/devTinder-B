const express=require("express");
require('dotenv').config();
const app =express();

app.use("/test",(req,res)=>{
    res.send("Hello rom server 3000")
})

app.use("/hello",(req,res)=>{
    res.send("Hello")
})
app.use("/",(req,res)=>{
    res.send("Namaste node")
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port ${process.env.PORT}`)
})
