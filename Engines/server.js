
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const Server = {};


Server.init = function(settings){
   Server.app = express();
   Server.app.use(sessions(settings));
   Server.app.use(cookieParser());
   Server.app.use(bodyParser.urlencoded({extended: false}));
   Server.app.use(express.static(path.join(__dirname,'../public')));
   Server.app.use(function(req, res, next){
      console.log({
         message: 'incoming request',
         description: `${req.connection.remoteAddress} ${req.method} ${req.url}`
      });

      return next();
   });
   Server.app.use(passport.initialize());
   Server.app.use(passport.session());
   Server.app.engine('html', require('ejs').renderFile);
   Server.app.set("view engine", "html");
   Server.app.set('views', path.join(__dirname, '../views'));
   Server.app.listen(3001, () =>{        console.log("Server running on port 3001");    });
}

module.exports = Server;