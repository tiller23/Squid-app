//This file deals with the user sessions
const mysql = require('../Engines/mysql');
const manager = require('../managers/userData');
const path = require('path');

module.exports.logout = function(req, res){
    return req.session.destroy(function(err) {
        if(err) {
           console.log(err);
      } else {
          res.redirect('/');
      }
   });
};

module.exports.userSession = function(req, res){
    return res.render('login.html');
};
module.exports.loginSuccessful = function(req, res){
    return res.render('loginSucess.html');
};
module.exports.loginFailure = function(req, res){
    return res.render('loginfail.html');
};


//the login checks their credentials against the database and then logs them in
module.exports.login = function(req, res){
    manager.login({
        userName: req.body.userName,
        password: req.body.password
    }).then(function(success){
        res.sendFile(success);
    },function(err){
        res.status(400).send(err.message || err.stack || err.trace);
    });
};