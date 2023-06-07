//This is the file that controls all the registration for either the newsletter or the site itself
const manager = require('../managers/registration');
const path = require('path');

module.exports.serve = function(req, res){
    return res.sendFile(path.join(__dirname, '../', './registration.html'));
};

module.exports.register = function(req, res){
    manager.register({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    }).then(function(success){
        res.sendFile(success);
    },function(err){
        res.status(400).send(err.message || err.stack || err.trace);
    });
};

module.exports.newServe = function(req,res){
    return res.sendFile(path.join(__dirname, '../', './newsLetter.html'));
};

module.exports.newsReg = function(req, res){
    manager.newsRegister({
        email: req.body.email
    }).then(function(success){
        res.sendFile(success);
    },function(err){
        res.status(400).send(err.message || err.stack || err.trace);
    });


};