const jwt = require('jsonwebtoken')

const authMiddle = (req,res,next)=>{
    const token = req.headers.token
    if(token){
        const decode =  jwt.verify(token, 'SECRET_KEY/MOC-11')
        console.log(decode)
        if(decode.isAdmin){
            next()
        }else{
           return res.status(401).json({"msg":"you are not admin"})
        }
    }else{
        return  res.status(401).json({"msg":"please login first"})
    }
}

module.exports = authMiddle