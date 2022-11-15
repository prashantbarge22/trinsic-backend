const {createCredential,getAllDid} = require("../Controller/Trinsic")
let Router = require("express").Router();

Router.get("/",async (req,res)=>{
    res.send("Sevrer is working")
})

 Router.get("/getDid",getAllDid)
 Router.post("/issue-credentials",createCredential)

module.exports = Router;