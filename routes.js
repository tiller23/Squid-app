const server = require('./Engines/server');
const {alive, home} = require('./controllers/main');
const {logout, login, userSession} = require('./controllers/user');
const {register, newsReg, serve, newServe} = require('./controllers/registration');
const{ shop, contacts, about, success } = require('./controllers/features');
//All of the routes to diffrent things, implement the controls set 
//through different objects that pull from the controllers folder
server.app.get('/alive', alive);
server.app.get('/', home);
server.app.get('/logout', logout);
server.app.get('/register', serve);
server.app.get('/login', userSession);
server.app.get('/newsLetter', newServe);
server.app.get('/shopping', shop);
server.app.get('/contact', contacts);
server.app.get('/aboutMe', about);
server.app.get('/loginSucess', success);

server.app.post('/register', register);
server.app.post('/login', login);
server.app.post('/newsLetter', newsReg);