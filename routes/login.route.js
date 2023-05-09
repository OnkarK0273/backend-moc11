const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModal = require("../model/user.model");

const loginRoute = express.Router()


loginRoute.post('/',async(req,res)=>{
    const {Email,Password} = req.body


    try{
        const isLogin = await UserModal.findOne({Email})

        if(!isLogin){
            return res.status(400).send({massage:"user not Registerd"})
        }else{

            bcrypt.compare(Password,isLogin.Password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userid:isLogin._id},'SECRET_KEY/MOC-12')

                    res.status(200).send({ "token":token});
                }else{
                    res.status(400).send({massage:"check your password"});
                }
            })


        }

    }catch(err){

        res.status(400).json({err:err.message})

    }


})


module.exports = loginRoute