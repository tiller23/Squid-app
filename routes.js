const server = require('./Engines/server');
const mysql  = require('./Engines/mysql');

let encodeUrl = parseUrl.urlencoded({ extended: false });

server.app.get('/alive', function(req, res){ return res.send('OK'); });

server.app.get('/app1', (req, res) => { res.sendFile(path.join(__dirname + '/index.html')); })
 
 server.app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
          if(err) {
             console.log(err);
        } else {
            res.redirect('/app1/index.html');
        }
     });
});

 server.app.post('/register', encodeUrl, (req, res) => {
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
        });
      
 server.app.post('/login', encodeUrl, (req, res) => {
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
         });

         server.app.post('/newsLetter', encodeUrl, (req, res) => {
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
                            //res.sendFile(__dirname +'/newsRegistration.html');
                        };
                    });
                });
            });     