
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');

const Server = {};


Server.init = function(settings){
   Server.app = express();
   Server.app.use(sessions(settings));
   Server.app.use(cookieParser());
   //Server.app.use(express.static(path.join(__dirname,'./')));
   Server.app.use(function(req, res, next){
      console.log({
         message: 'incoming request',
         description: `${req.connection.remoteAddress} ${req.method} ${req.url}`
      });

      return next();
   });
   Server.app.listen(3001, () =>{        console.log("Server running on port 3001");    });
}

module.exports = Server;