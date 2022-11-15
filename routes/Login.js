const Router = require("express").Router();
const {Login,VerifyOTP,getAccountInfo} = require("../Controller/Trinsic");


Router.post("/login", Login)
Router.post("/verify-otp", VerifyOTP)
Router.get("/info",getAccountInfo);

module.exports = Router;