let mysql = require('../Engines/mysql');
const path = require('path');
const loginController = require('../controllers/user');
module.exports.login = function(data){
    return new Promise(function(resolve, reject){
        mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`, function(err, results, fields){
            if(err){ return reject(err); }
            if(!results.length){ return resolve(path.join(__dirname, '../', './loginFail.html')) }
            return loginController.loginSuccessful();
        });
    });
};