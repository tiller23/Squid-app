let mysql = require('../Engines/mysql');
const path = require('path');

module.exports.login = function(data){
    return new Promise(function(resolve, reject){
        mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`, function(err, results, fields){
            if(err){ return reject(err); }
            if(!results.length){ return resolve(path.join(__dirname, '../', './loginFail.html')) }
            return resolve(path.join(__dirname, '../', './loginSucess.html'));
        });
    });
    /*let result =  mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`);
    console.log(result.values);
    if(Object.keys(result).length > 0){
        return path.join(__dirname, '../', './loginSucess.html');
    }else{
        return path.join(__dirname, '../', './loginFail.html');
    }*/


};