//This is the file that controls all the registration for either the newsletter or the site itself
const mysql = require('../Engines/mysql');
const manager = require('../managers/registration');
const path = require('path');

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

module.exports.newsReg = function(req, res){
    res.sendFile(path.join(__dirname, '../', './newsLetter.html'));
    var email = req.body.email;
    //A much simpler sql connection, this only requires an email.
    mysql.connection.query(`SELECT * FROM news WHERE email = '${email}'`, function(err, result){
        if(err){
            console.log(err);
        };
        if(Object.keys(result).length > 0){
            res.send(path.join(__dirname , '../', 'newsFail.html'));
        }else{
            res.sendFile(path.join(__dirname , '../', '/newsRegistration.html'));
            }
    //This inserts the email into the database for storage
    var sql = `INSERT INTO news (email) VALUES ('${email}')`;
    mysql.connection.query(sql, function (err, result) {
        if (err){
            console.log(err);
        }else{
                        
            };
    });
});
};