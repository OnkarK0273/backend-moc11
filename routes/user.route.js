const express = require("express");
const bcrypt = require("bcrypt");
const UserModal = require("../modal/user.modal");



const userRoute = express.Router()

userRoute.post("/",async(req,res)=>{

    console.log(req.body)
    const {email,password} = req.body

    try{

        isReg = await UserModal.find({email})
        console.log(isReg)
        if(isReg.length>0){
            return res.status(400).send({error:"user Allredy Exist"})
        }

        const hashPass = await bcrypt.hash(password,5)

        const user = new UserModal({...req.body,password:hashPass})

        const result = await user.save()

        res.status(200).send({massage:"Registration Sucessfull",user:result})

    }catch(err){
        res.status(400).json({err:err.message})
    }

})




module.exports = userRoute