////MongoDB

//Here we set-up our connection to the MongoDB, and export
//the mongoose.model to the main app.js file
const mongoose = require("mongoose");

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

const UserNo1 = new User({
  name: "Anonymous",
  email: "anonym@gmail.com",
});

UserNo1.save()

const UserNo2 = new User({
  name: "somewhere",
  email: "smw@gmail.com",
});

UserNo2.save();

module.exports=User