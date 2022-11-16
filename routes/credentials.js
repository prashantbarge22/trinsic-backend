const {
  createCredential,
  getAllDid,
  createProof,
  verifyProof,
} = require("../Controller/Trinsic");
let Router = require("express").Router();

Router.get("/", async (req, res) => {
  res.send("Sevrer is working");
});

Router.get("/getDid", getAllDid);
Router.post("/issue-credentials", createCredential);
Router.post("/createProof", createProof);
Router.post("/verifyProof", verifyProof);

module.exports = Router;
