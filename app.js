//jshint esversion:6

////Set-up, require modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

////Secret key
const env = require("dotenv").config();
const Secret = process.env.SECRET;

////MongoDB
mongoose.connect("mongodb://localhost:27017/Users2DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = {
  name: String,
  email: String,
};

const User = mongoose.model("User", userSchema);

//To manually insert two users, copy-paste from file /insert.txt

////Routes' functions
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  User.findOne(
    {
      name: name,
      email: email,
    },
    function (err, foundUser) {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        jwt.sign(
          { foundUser },
          Secret,
          { expiresIn: "120s" },
          function (err, token) {
            console.log("T1", token);
            res.setHeader("authorization", token)
          }
        );
        res.redirect("/auth");
      }
      // else {
      //   res.send("<h1>YOU ARE NOT AUTHORIZED</h1>");
      // }
    }
  );
});

app.get("/auth", authenticate, function (req, res) {
  jwt.verify(req.token, Secret, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("<h1>AUTHORIZED!</h1>");
    }
  });
});


//BEARER verification
function authenticate(req, res, next) {
  const headers = req.headers["authorization"];
  if (typeof headers !== "undefined") {
    const token1 = headers.split(" ");
    const token2 = token1[1];
    req.token = token2;
    next();
  } else {
    res.send("<h1>YOU ARE NOT AUTHORIZED</h1>");
  }
}

app.listen(2145, function () {
  console.log("Server started on port 2145");
});
