const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModal = require("../modal/user.modal");


const loginRoute = express.Router()

loginRoute.post("/",async(req,res)=>{

    const {email,password} = req.body

    try{

        const isLogin = await UserModal.findOne({email})

        if(!isLogin){
            return res.status(400).send({error:"user not Registerd"})
        }else{

            bcrypt.compare(password,isLogin.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userid:isLogin._id,isAdmin:isLogin.isAdmin},'SECRET_KEY/MOC-11')

                    res.status(200).send({ "token":token, "user":isLogin });
                }else{
                    res.status(400).send({error:"check your password"});
                }
            })


        }

        


    }catch(err){
        res.status(400).send({error:err.message})
    }

})


module.exports = loginRoute