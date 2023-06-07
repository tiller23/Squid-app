const server = require('./Engines/server');
const {alive, home} = require('./controllers/main');
const {logout, login} = require('./controllers/user');
const {register, newsReg} = require('./controllers/registration');
const path = require('path');

//All of the routes to diffrent things, implement the controls set 
//through different objects that pull from the controllers folder
server.app.get('/alive', alive);
server.app.get('/app1', home);
server.app.get('/logout', logout);
server.app.post('/register', register);
server.app.post('/login', login);
server.app.post('/newsLetter', newsReg);