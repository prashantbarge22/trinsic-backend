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

exports.createCredential = async ()=>{
   try{ 
  let data = {
    Name:"Prashant Barge"
  }
   let insertResponse = await Trinsic.createCredential(data);
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