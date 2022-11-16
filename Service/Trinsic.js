const { TrinsicService, AccountService, LoginRequest, IssueFromTemplateRequest, InsertItemRequest, SignInRequest, CredentialService, SendRequest, CreateProofRequest } = require("@trinsic/trinsic");
const ecosystemId = "urn:trinsic:ecosystems:Liquid";
const trinsic = new TrinsicService();


exports.addAuthToken = async (authToken) => {
    trinsic.setAuthToken(authToken);
}

exports.SignUp = async (email, name, mobile) => {
    try {
        let signUpResonse = await trinsic.account().signIn(SignInRequest.fromPartial({
            details: {
                email: email,
                name: name,
                sms: mobile,
            },
            ecosystemId: ecosystemId
        }))

        return signUpResonse
    } catch (err) {
        throw err.message;
    }
}

exports.verifySignUpOTP = async (data, otp) => {
    let response = await AccountService.unprotect(data, otp);
    return response;
}


exports.getInfo = async () => {
    return trinsic.account().info();
}

exports.searchDid = async () => {
    let result = await trinsic.wallet().searchWallet();
    return result;
}

exports.sendOTP = async (email) => {
    let loginResponse = await trinsic.account().login(
        LoginRequest.fromPartial({
            email: email,
            ecosystemId: ecosystemId
        })
    );

    return loginResponse;
}

exports.VerifyOTP = async (challenge, otp) => {
    try {
        return await trinsic
            .account()
            .loginConfirm(challenge, otp);
    } catch (err) {
        return err;
    }
}

exports.createCredential = async (userAuth, email, data) => {
    try {
        let request = await IssueFromTemplateRequest.fromPartial({
            templateId: "urn:template:Liquid:did",
            valuesJson: JSON.stringify(data),
        });

        let issueResponse = await trinsic.credential().issueFromTemplate(request);
        console.log(issueResponse)
        let response = await trinsic.credential().send({
            email: email,
            documentJson: issueResponse.documentJson
        })
        return issueResponse.documentJson;
    } catch (err) {
        return err;
    }
}


exports.createProof = async (itemId) => {
    return await trinsic.credential().createProof(CreateProofRequest.fromPartial({
        itemId: itemId,
    }))
}

exports.verifyProof = async (proof) => {
    let verifyResponse = await trinsic.credential().verifyProof({
        proofDocumentJson: proof,
    });
    return verifyResponse;
}