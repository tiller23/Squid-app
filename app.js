const Config = require('./config/development');
const mysql = require('./Engines/mysql');

const Server = require('./Engines/server');

//const { encode } = require('punycode');

Server.init(Config.server);
mysql.init(Config.mysql);


require('./routes');
