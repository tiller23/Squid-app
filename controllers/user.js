const mysql = require('./Engines/mysql');

module.exports.logout = function(req, res){
    return req.session.destroy(function(err) {
        if(err) {
           console.log(err);
      } else {
          res.redirect('/app1/index.html');
      }
   });
};

module.exports.login = function(req, res){
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
                         res.sendFile(__dirname+ '/loginSucess.html');
                //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${userName}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            }else{
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
            }
                  });
};