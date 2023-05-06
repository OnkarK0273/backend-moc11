const express = require("express");
const BookModal = require("../modal/book.modal");
const authMiddle = require("../middlewere/auth");

const bookRoute = express.Router()


bookRoute.get("/",async(req,res)=>{

    console.log(req.query)
    const { author,category} = req.query
   
    try{

        if(author?.length && category?.length){
            const book = await BookModal.find({author,category})
            res.status(201).send({"books":book})
        }else if(category?.length){
            const book = await BookModal.find({category})
            res.status(201).send({"books":book})
        }else{
            const book = await BookModal.find()
            res.status(201).send({"books":book})
        }


    }catch(err){
        res.status(400).send({error:err.message})
    }

})

bookRoute.get(`/:_id`,async(req,res)=>{
   
   const _id = req.params._id
    try{

        const book = await BookModal.findOne({_id})
        res.status(201).send({"book":book})

    }catch(err){
        res.status(400).send({error:err.message})
    }

})



bookRoute.post("/",authMiddle,async(req,res)=>{

    try{
        const newbook = new BookModal(req.body)
        await newbook.save()
        res.status(201).send({"msg":"book added"})

    }catch(err){
        res.status(400).send({error:err.message})
    }

})


bookRoute.patch(`/:_id`,authMiddle,async(req,res)=>{

    try{
         await BookModal.updateOne(req.params, { $set: req.body })
      
        res.status(201).send({"msg":"book edited"})

    }catch(err){
        res.status(400).send({error:err.message})
    }

})

bookRoute.delete(`/:_id`,authMiddle,async(req,res)=>{

    try{
         await BookModal.deleteOne(req.params)

        res.status(201).send({"msg":"book deleted sucessfully"})

    }catch(err){
        res.status(400).send({error:err.message})
    }

})

module.exports = bookRoute

