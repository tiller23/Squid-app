//All the requires that brings in the the necessary files to give everything proper scope.
const Config = require('./config/development');
const mysql = require('./Engines/mysql');
//const Server = require('./Engines/server');

//the configurations for the server
Server.init(Config.server);
mysql.init(Config.mysql);

require('./routes');
