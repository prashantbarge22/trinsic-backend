const Trinsic = require("../Service/Trinsic");

exports.getAllDid = async (req, res) => {
    try {
        let result = await Trinsic.searchDid();
        res.send({ data: result, error: "" });
    } catch (err) {
        res.send({ data: "", error: err.message })
    }
}


exports.Login = async (req, res) => {

    try {
        try {
            let email = req.body.email;
            const loginResponse = await Trinsic.sendOTP(email)
            req.session.challenge = loginResponse.challenge;
            res.send({ data: "OTP SENT", error: "" });
        } catch (err) {
            req.send({ data: "", error: err.message });
        }
    } catch (err) {
        res.send({ data: "", error: err.message })
    }

}

exports.VerifyOTP = async (req, res) => {
    try {
        let challenge = new Buffer.from(req.session.challenge);
        let otp = req.body.otp;
        const authToken = await Trinsic.VerifyOTP(challenge,otp)
        req.session.authToken = authToken;
        Trinsic.addAuthToken(authToken);
        res.send({ data: "Authorized", error: "" })
    } catch (err) {
        res.send({ data: "", error: err.message })
    }
}

exports.createCredential = async (req,res)=>{
   try{ 
  let userAuth = req.session.authToken;
  let email = req.body.email;
  let data = {
    Name:"Prashant Barge"
  }
   let insertResponse = await Trinsic.createCredential(userAuth,email,data);
   res.send({data:insertResponse,error:""})
}catch(err){
    throw err.message;
}
}

exports.getAccountInfo = async (req,res)=>{
 try{
    let info = await Trinsic.getInfo();
    
    res.send({data:info,token:req.session.authToken,error:""})
 }catch(err){
    res.send({ data: "", error: err.message })
 }
}

exports.SignUp = async (req,res)=>{
 try{
    let name = req.body.name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let loginResonse = await Trinsic.SignUp(email,name,mobile);
    req.session.authToken = loginResonse.data;
    res.send({ data: loginResonse, error: ""})

 }catch(err){
    res.send({ data: "", error: err.message })
 }
}

exports.VerifySignUpOTP = async (req,res)=>{
    try{
        
        let data = req.body.data;
        let otp = req.body.otp;
        let result = await Trinsic.verifySignUpOTP(data,otp);
        req.session.authToken = result;
        Trinsic.addAuthToken(result);
        res.send({ data: result, error: ""})
     }catch(err){
        res.send({ data: "", error: err.message })
     }
}