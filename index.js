const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const loginRoute = require("./routes/login.route");
const bookRoute = require("./routes/book.route");
const authMiddle = require("./middlewere/auth");
require("dotenv").config();
const app = express();

app.use(express.json())

app.use("/register", userRoute);

app.use("/login", loginRoute);



app.use("/book",bookRoute)



app.listen(process.env.HTTP_PORT, async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT);
      console.log("connected db");
    } catch (err) {
      console.log("not-connected");
      console.log(err);
    }
    console.log("port 4500 running");
  });