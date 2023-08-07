let mysql = require('../Engines/mysql');
const passport = require('passport');
let LocalStrategy = require('passport-local');
const axios = require('axios');




module.exports.login = function(data, req, res){
    
    return new Promise(function(resolve, reject){
        mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`, function(err, results, fields){
            if(err){ return reject(err); }
            if(!results.length){ return resolve(console.log("sad"));}//res.render('loginFail.html')) }
            
            return console.log("yay");//res.render('loginSucess.html');
        });
    });
};