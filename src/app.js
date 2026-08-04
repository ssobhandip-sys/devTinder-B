const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDb = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
//to convert the json to jsavascript object so that server can understand
app.use(express.json());
app.use(cookieParser());

// Handling routers

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
