let mysql = require('../Engines/mysql');
const path = require('path');

module.exports.login = async function(data){
    let result = await mysql.connection.query(`SELECT * FROM accounts WHERE username = '${userName}' AND password = '${password}'`);
    if(err){
        console.log(err)
    };
    if(Object.keys(result).length > 0){
        return path.join(__dirname, '../', './loginSucess.html');
    }else{
        return path.join(__dirname, '../', './loginFail.html');
    }

};