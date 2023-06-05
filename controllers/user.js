//This file deals with the user sessions
const mysql = require('../Engines/mysql');

module.exports.logout = function(req, res){
    return req.session.destroy(function(err) {
        if(err) {
           console.log(err);
      } else {
          res.redirect('/app1/index.html');
      }
   });
};

//the login checks their credentials against the database and then logs them in
module.exports.login = function(req, res){
    res.sendFile(path.join(__dirname, '../', '/login.html'));
    var userName = req.body.userName;
    var password = req.body.password;

    mysql.connection.query(`SELECT * FROM accounts WHERE username = '${userName}' AND password = '${password}'`, function (err, result) {
        if(err){
             console.log(err);
             };
                function userPage(){
                    // We create a session for the dashboard (user page) page and save the user data to this session:
                     req.session.user = {
                         email: email,
                         username: userName,
                         password: password
                     };
            }
             if(Object.keys(result).length > 0){
                         res.sendFile(__dirname, '../', './loginSucess.html');
                //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${userName}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            }else{
                res.sendFile(__dirname, '../', './loginFail.html');
            }
                  });
};