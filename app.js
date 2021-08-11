//jshint esversion:6

////Set-up, require modules; 

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const localStorage=require('local-storage')
//Two modules made by me and imported from their files;
//The MongoDB set-up and the middleware of the
//Protected route, checking the token
const User=require("./mongoose.js")
const authorize=require("./authorize.js")

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


//The Secret key, hidden with dotenv, is needed in the jwt-signup
const env = require("dotenv").config();
const Secret = process.env.SECRET;

////Routes' functions
//This function serves the front-end for login
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

//This function receives the name/email from
//The front-end, checks if they are correct 
//Againt the MongoDB, and creates a jwt token if so;
//It is saved on localStorage
app.post("/login", function(req, res){
  const name = req.body.name;
  const email = req.body.email;
    User.findOne({name: name, email: email},
      function(err, foundUser){
        if (err){
          console.log(err)
        }else if (foundUser){
          jwt.sign({foundUser}, Secret, {expiresIn: "5s"}, function (err, token){
            localStorage.set("token", JSON.stringify(token))
            res.redirect("/auth");
          })
        }else {
          res.send("<h1>WRONG NAME/EMAIL, REFRESH AND TRY AGAIN</h1>")
        }
      })
})


//The protected "/auth" route, the middleware "authorize" 
//(imported from "/authorize.js", above)
//checks the token; only if it is, the user is allowed to view the route
app.get("/auth", authorize, function (req, res) {
  res.send("<h1>WELCOME TO PROTECTED ROUTE</h1>")
  });


app.listen(2145, function () {
  console.log("Server started on port 2145");
});