let mysql = require('../Engines/mysql');
const path = require('path');

module.exports.login = async function(data){
    let result = await mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`);
    console.log(result.values);
    if(Object.keys(result).length > 0){
        return path.join(__dirname, '../', './loginSucess.html');
    }else{
        return path.join(__dirname, '../', './loginFail.html');
    }

};