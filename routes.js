const server = require('./Engines/server');
const {alive, home} = require('./controllers/main');
const {logout, login} = require('./controllers/user');
const {register, newsReg, serve} = require('./controllers/registration');
const path = require('path');

//All of the routes to diffrent things, implement the controls set 
//through different objects that pull from the controllers folder
server.app.get('/alive', alive);
server.app.get('/', home);
server.app.get('/logout', logout);
server.app.get('/app1/register', serve);
server.app.get('/app1/login');
server.app.get('/app1/newsLetter');

server.app.post('/app1/register', register);
server.app.post('/app1/login', login);
server.app.post('/app1/newsLetter', newsReg);