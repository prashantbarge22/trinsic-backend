const Router = require("express").Router();
const {Login,VerifyOTP,getAccountInfo,SignUp,VerifySignUpOTP} = require("../Controller/Trinsic");


Router.post("/signup",SignUp)
Router.post("/login", Login)
Router.post("/verify-otp", VerifyOTP)
Router.get("/info",getAccountInfo);
Router.post("/verifySignupOtp",VerifySignUpOTP)

module.exports = Router;