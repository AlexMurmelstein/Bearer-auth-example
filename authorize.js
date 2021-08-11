const jwt = require("jsonwebtoken");
const localStorage=require('local-storage')
const env = require("dotenv").config();
const Secret = process.env.SECRET;



//BEARER verification
//This is the "authorize" middleware function, which checks
//The jwt token, extracted from localStorage. 
//Added a special "token expired" error, to catch that one too.
//Apart from that, a general "unauthorized" message will be sent if attempting
//To reach the /auth path manually from the address bar.
//The function is exported to the main app.js.
module.exports=function authorize(req, res, next) {
    const token3=JSON.parse(localStorage.get("token"))
    if (token3){
      jwt.verify(token3, Secret, function (err) {
        if (err) {
          if (err.name==="TokenExpiredError"){
            res.send("<h1>YOUR TOKEN EXPIRED! You are not authorized!</h1>")
          }else{
            console.log(err)
          }
        } else {
          next();
        }
      });
    }else{
      res.send("<h1>You are not authorized!</h1>")
    }
};