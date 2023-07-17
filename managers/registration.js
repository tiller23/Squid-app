let mysql = require('../Engines/mysql');

module.exports.register = function(data, req, res){
    //This allows the sql connection to make sure that the credentials inserted are not already in the system
return new Promise(function(resolve, reject){
    mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password  = '${data.password}'`, function(err, results, fields){
        if(err){return reject(err);}
        if(!results.length){ return resolve(res.render('regFail.html')); }
        mysql.connection.query(`INSERT INTO accounts (email, username, password) VALUES ('${data.email}', '${data.userName}', '${data.password}')`);
        return res.render('regSucess.html');
    });
    
});

    /*let result = await mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password  = '${data.password}'`, function(err){
    if (err){
        console.log(err);
    };
    if(Object.keys(result)){
        return res.render('regFail.html');
    }
    });
    //After checking if the user is already in the system, inserts their credentials into the database
    await mysql.connection.query(`INSERT INTO accounts (email, username, password) VALUES ('${data.email}', '${data.userName}', '${data.password}')`);
    return res.render('regSucess.html');*/
};

module.exports.newsRegister = async function(data){
    //allowing sql connection to make sure credentials aren't already inserted in the system
    let result = await mysql.connection.query(`SELECT * FROM news WHERE email = '${data.email}'`);
    if(Object.keys(result).length > 0){
        return regController.newsFailure();
    }

    //After checking if the email was valid or if it was already in the system, insert date into the sql database
    await mysql.connection.query(`INSERT INTO news (email) VALUES ('${data.email})'`);
    return regController.newsSuccessful();
};