const express = require("express");
const bcrypt = require("bcrypt");
const UserModal = require("../model/user.model");
const signRoute = express.Router()


signRoute.post('/',async(req,res)=>{

    const {Email,Password} = req.body

    try{
        isReg = await UserModal.find({Email})
        
        if(isReg.length>0){
            return res.status(400).send({massage:"user Allredy Exist"})
        }

        const hashPass = await bcrypt.hash(Password,5)

        const user = new UserModal({...req.body,Password:hashPass})

        const result = await user.save()

        res.status(200).send({massage:"Registration Sucessfull"})


    }catch(err){

        res.status(400).json({err:err.message})

    }


})


module.exports = signRoute