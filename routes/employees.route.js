const express = require("express");
const EmployeModal = require("../model/employees.model");


const employeesRoute = express.Router()

employeesRoute.get("/",async(req,res)=>{

    const { page, department, sort, search } = req.query;
    const pageSize = 5;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * pageSize;
    const sortQuery = {};
    const searchQuery = {};

    // Filter by department
    if (department) {
        searchQuery.Department = department;
    }

    // Sort by salary

    if (sort) {
        const sortDirection = sort.startsWith('-') ? -1 : 1;
        const sortField = sort.replace('-', '');
        sortQuery[sortField] = sortDirection;
        console.log(sortQuery)
    }

    // Search by first name
    
    if (search) {
        searchQuery.First_Name = { $regex: search, $options: 'i' };
    }

    try{
        let employees = await EmployeModal.find(searchQuery).sort(sortQuery).skip(skip).limit(pageSize)

        res.status(201).send({"data":employees})

    }catch(err){
        res.status(400).json({err:err.message})
    }

})


employeesRoute.post("/",async(req,res)=>{

    try{
        let newEmp = new EmployeModal(req.body)
        await newEmp.save()
        res.status(201).send({"message":"Employe data Added"})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})


employeesRoute.patch(`/:_id`,async(req,res)=>{

    try{

        await EmployeModal.updateOne(req.params, { $set: req.body })
      
        res.status(201).send({"message":"Edited sucessfully"})


    }catch(err){
        res.status(400).json({err:err.message})
    }

})

employeesRoute.delete(`/:_id`,async(req,res)=>{

    try{

        await EmployeModal.deleteOne(req.params)
      
        res.status(201).send({"message":"Deleted sucessfully"})


    }catch(err){
        res.status(400).json({err:err.message})
    }

})

module.exports = employeesRoute

