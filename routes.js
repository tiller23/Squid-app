const server = require('./Engines/server');
const {alive, home} = require('./controllers/main');
const {logout, login, userSession} = require('./controllers/user');
const {register, newsReg, serve, newServe} = require('./controllers/registration');
const{ shop, contacts, about, success, failure, me } = require('./controllers/features');
const local = require('./strategies/local');
const passport = require('passport');
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
server.app.get('/loginFail', failure);
server.app.get('/profile', function(req, res) {
    console.log("Is authenticated?", req.isAuthenticated());
    console.log("User:", req.user);
    // Rest of your code
    res.send("look at logs");
  });

server.app.post('/register', register);
server.app.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSucess',
    failureRedirect: '/loginFail'
}));
server.app.post('/newsLetter', newsReg);