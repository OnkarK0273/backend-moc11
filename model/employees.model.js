const mongoose = require("mongoose")


const employeScema = mongoose.Schema({
    First_Name:String,
    Last_Name:String,
    Email:String,
    Department:String,
    Salary:Number
})


const EmployeModal = mongoose.model("employee",employeScema)

module.exports = EmployeModal