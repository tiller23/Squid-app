let mysql = require('../Engines/mysql');
const path = require('path');

module.exports.register = async function(data){
    //This allows the sql connection to make sure that the credentials inserted are not already in the system
    let result = await mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password  = '${data.password}'`, function(err, result){
    if (err){
        console.log(err);
    };
    if($data.userName || $data.email){
        return path.join(__dirname, '../', './regFail.html');
    }
    });
    //After checking if the user is already in the system, inserts their credentials into the database
    await mysql.connection.query(`INSERT INTO accounts (email, username, password) VALUES ('${data.email}', '${data.userName}', '${data.password}')`);
    return path.join(__dirname, '../', './regSucess.html');

};

module.exports.newsRegister = async function(data){
    //allowing sql connection to make sure credentials aren't already inserted in the system
    let result = await mysql.connection.query(`SELECT * FROM news WHERE email = '${email}'`);
    if(Object.keys(result).length > 0){
        return path.join(__dirname, '../', './newsFail.html');
    }

    //After checking if the email was valid or if it was already in the system, insert date into the sql database
    await mysql.connection.query(`INSERT INTO news (email) VALUES ('${email})'`);
    return path.join(__dirname, '../', './newsRegistration.html');
};