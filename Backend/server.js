const express = require("express");
const app = express();
const constants =  require("./constants.js");

const bodyParser = require("body-parser");
const cors = require("cors");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

const signupRouter = require("./Routes/signup.js");
const loginRouter = require("./Routes/login.js");
app.use("/signup", signupRouter);
app.use("/login", loginRouter);


app.listen(constants.PORT, async function(){
    console.log(`Server is listening on PORT ${constants.PORT}` );
})