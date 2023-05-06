const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const loginRoute = require("./routes/login.route");
const bookRoute = require("./routes/book.route");


const app = express();

app.use(express.json())

app.use("/register", userRoute);

app.use("/login", loginRoute);



app.use("/book",bookRoute)



app.listen(4500, async () => {
    try {
      await mongoose.connect(`mongodb+srv://onkar:onkaratlas@cluster0.xxociih.mongodb.net/moc11?retryWrites=true&w=majority`);
      console.log("connected db");
    } catch (err) {
      console.log("not-connected");
      console.log(err);
    }
    console.log("port 4500 running");
  });