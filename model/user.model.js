const mongoose = require("mongoose")


const userScema = mongoose.Schema({
    Email:String,
    Password:String
})


const UserModal = mongoose.model("user",userScema)

module.exports = UserModal