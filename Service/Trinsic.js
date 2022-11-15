const {TrinsicService,AccountService,LoginRequest, IssueFromTemplateRequest,InsertItemRequest} = require("@trinsic/trinsic");
const ecosystemId = "urn:trinsic:ecosystems:Liquid";
const trinsic =  new TrinsicService();


exports.addAuthToken = async (authToken)=>{
  trinsic.setAuthToken(authToken);
}

exports.getInfo = async ()=>{
 return trinsic.account().info();
}

exports.searchDid = async()=>{
    let result = await trinsic.wallet().searchWallet();
    return result;
}

exports.sendOTP = async (email)=>{
    let loginResponse = await trinsic.account().login(
        LoginRequest.fromPartial({
            email: email,
        })
    );
 
return loginResponse;
}

exports.VerifyOTP = async (challenge , otp)=>{
    try{
   return await trinsic
            .account()
            .loginConfirm(challenge, otp);
    }catch(err){
        return err;
    }
}

exports.createCredential = async (data)=>{
    try{
    trinsic.setAuthToken(processe.env.AUTHTOKEN)
    let request = IssueFromTemplateRequest.fromPartial({
        templateId: "urn:template:Liquid:did",
        valuesJson: JSON.stringify(data),
    });
    
    let issueResponse = await trinsic.credential().issueFromTemplate(request);
    trinsic.setAuthToken(req.session.authToken);
    const insertResponse = await trinsic.wallet().insertItem(
        InsertItemRequest.fromPartial({
            itemJson: issueResponse.documentJson,
        }));
    return insertResponse;
    }catch(err){
        throw err.message;
    }
}