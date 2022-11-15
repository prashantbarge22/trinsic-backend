const express = require("express");
const session = require("express-session")
const app = express();
const dotenv = require("dotenv");
const credentialsRoute = require("./routes/credentials");
const LoginRoute = require("./routes/Login")
const {checkAuthToken} = require("./middlware/Authentication");

dotenv.config();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}))

const PORT = "8000" || process.env.PORT;

app.use(express.json());

app.use("/auth",LoginRoute);

app.use("/api",checkAuthToken,credentialsRoute);

app.listen(PORT,()=>{
    console.log(`Sevrer Started at ${PORT}`)
})





