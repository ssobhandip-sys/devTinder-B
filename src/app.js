const express = require("express");
require("dotenv").config();
const app = express();
//wild card route

app.use(
  "/user",
  (req, res,next) => {
    console.log("1st route handler");
    next();
    //res.send("Hello rom server 3000");
    
  },
  (req, res) => {
    console.log("2nd route handler")
    //res.send("2nd route handler");
    next();
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});
