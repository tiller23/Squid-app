module.exports.register = function(req, res){
    var email = req.body.email;
    var userName = req.body.userName;
    var password = req.body.password;

    mysql.connection.query(`SELECT * FROM accounts WHERE username = '${userName}' AND password  = '${password}'`, function(err, result){
        if(err){
            console.log(err);
        };
        if(Object.keys(result).length > 0){
            res.send("<div align ='center'><h2>Username or Email already Already has an Account</h2></div><br><br><div align='center'><a href='./registration.html'>Register Again<a><div>");
        }else{
            function userPage() {
            req.session.user = {
                email: email,
                username: userName,
                password: password
            };
        }
    var sql = `INSERT INTO accounts (email, username, password) VALUES ('${email}', '${userName}', '${password}')`;
       
     mysql.connection.query(sql, function (err, result) {
        if (err){
            console.log(err);
        }else{
            res.sendFile(__dirname +'/regSucess.html');
        };
        });

        }
    });
};

module.exports.newsReg = function(req, res){
    var email = req.body.email;

    mysql.connection.query(`SELECT * FROM news WHERE email = '${email}'`, function(err, result){
        if(err){
            console.log(err);
        };
        if(Object.keys(result).length > 0){
            res.send("<div align ='center'><h2>Invalid email</h2></div><br><br><div align='center'><a href='./newsLetter.html'>Try Again<a><div>");
        }else{
            res.sendFile(__dirname +'/newsRegistration.html');
            }
        var sql = `INSERT INTO news (email) VALUES ('${email}')`;
        mysql.connection.query(sql, function (err, result) {
            if (err){
                console.log(err);
            }else{
                            
            };
        });
    });
};