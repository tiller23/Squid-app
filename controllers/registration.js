//This is the file that controls all the registration for either the newsletter or the site itself
const manager = require('../managers/registration');

module.exports.register = function(req, res){
    manager.register({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    }).then(function(success){
        res.render(success);
    },function(err){
        res.status(400).send(err.message || err.stack || err.trace);
    });
};

module.exports.newsReg = function(req, res){
    manager.newsRegister({
        email: req.body.email
    }).then(function(success){
        res.render(success);
    },function(err){
        res.status(400).send(err.message || err.stack || err.trace);
    });


};