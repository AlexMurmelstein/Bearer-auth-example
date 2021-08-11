The folder has a main app.js file, which is to be run using nodemon. 
It imports a mongodb-setup from "mongoose.js", and a middleware function,
Responsible for checking the jwt-token, from "authorize.js". The app.js contains
The login route and the protected /auth route. The "insert.txt" file contains a crude
Method of inserting two users into the mongoDB collection, for the sake
Of convenience. The login.html serves the Front-end login mechanism. 