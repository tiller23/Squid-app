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

server.app.post('/app1/register', encodeUrl, register);
      
server.app.post('/app1/login.html', encodeUrl, login);

server.app.post('/newsLetter', encodeUrl, newsReg);