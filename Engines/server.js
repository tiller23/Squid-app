
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const Server = {};


Server.init = function(settings){
   Server.app = express();
   Server.app.use(bodyParser.urlencoded({extended: false})); // Body parser
   Server.app.use(cookieParser()); // Cookie parser
   Server.app.use(sessions(settings)); // Session handling
   Server.app.use(passport.initialize()); // Passport initialization
   Server.app.use(passport.session()); // Passport session handling
   Server.app.use(express.static(path.join(__dirname,'../public'))); // Static files
   Server.app.engine('html', require('ejs').renderFile); // View engine setup
   Server.app.set("view engine", "html");
   Server.app.set('views', path.join(__dirname, '../views'));
   Server.app.listen(3001, () => { console.log("Server running on port 3001"); });
}


module.exports = Server;