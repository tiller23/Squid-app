const server = require('./Engines/server');
const mysql  = require('./Engines/mysql');
const http = require('http');
const {alive, home} = require('./controllers/main');
const {logout, login} = require('./controllers/users');
const {register, newsReg} = require('./controllers/registration');


let encodeUrl = parseUrl.urlencoded({ extended: false });

server.app.get('/alive', alive);

server.app.get('/app1', home);
 
server.app.get('/logout', logout);

server.app.post('/register', register);
      
server.app.post('/login', login);

server.app.post('/newsLetter', encodeUrl, newsReg);