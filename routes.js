const server = require('./Engines/server');
const {alive, home} = require('./controllers/main');
const {logout, login, userSession} = require('./controllers/user');
const {register, newsReg, serve, newServe} = require('./controllers/registration');

//All of the routes to diffrent things, implement the controls set 
//through different objects that pull from the controllers folder
server.app.get('/alive', alive);
server.app.get('/', home);
server.app.get('/logout', logout);
server.app.get('/register', serve);
server.app.get('/login', userSession);
server.app.get('/newsLetter', newServe);

server.app.post('/register', register);
server.app.post('/login', login);
server.app.post('/newsLetter', newsReg);