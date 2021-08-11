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

module.exports=User