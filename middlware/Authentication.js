const session = require("express-session");

exports.checkAuthToken = async (req,res,next)=>{
   if(req.session.authToken){
    next();
   }else{
    res.status(401).send({data:"",error:"UnAuthorized"})
   }
}

exports.checkChallnege = async (req,res)=>{
   if(req.session.challenge){
    next();
   }else{
    res.status(500).send({data:"Request OTP AGAIN",error:"Something went wrong"})
   }
}