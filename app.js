const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require("path");
const http = require('http');
var parseUrl = require('body-parser');
const app = express();

var mysql = require('mysql');
const { encode } = require('punycode');

let encodeUrl = parseUrl.urlencoded({ extended: false });

//express session is created
app.use(sessions({
     secret: "thisismysecrctekey",
     saveUninitialized:true,
     cookie: { secure: true}, // 24 hours
     resave: false 
}));
  app.use(cookieParser());
  var con = mysql.createConnection({
     host: "localhost",
     user: "root", // my username
     password: "password", // my password
     database: "myform" 
});
con.connect(function(err) {
	if(err){
	  console.log(err);
};
app.use(express.static(path.join(__dirname,'./')));

app.get('/app1', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

//destroying express session, Logout button
app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/app1/index.html');
		}
	});
});

app.post('/register', encodeUrl, (req, res) => {
     var email = req.body.email;
     var userName = req.body.userName;
     var password = req.body.password;

	con.query(`SELECT * FROM accounts WHERE username = '${userName}' AND password  = '${password}'`, function(err, result){
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
		
                 con.query(sql, function (err, result) {
                     if (err){
                         console.log(err);
                     }else{
                         res.sendFile(__dirname +'/regSucess.html');
			};
                 });

          }
          });
     });
   });

app.post('/login', encodeUrl, (req, res) => {
	var userName = req.body.userName;
        var password = req.body.password;

         con.query(`SELECT * FROM accounts WHERE username = '${userName}' AND password = '${password}'`, function (err, result) {
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

app.post('/newsLetter', encodeUrl, (req, res) => {
	var email = req.body.email;
	con.query(`SELECT * FROM news WHERE email = '${email}'`, function(err, result){
		if(err){
			console.log(err);
		};
		if(Object.keys(result).length > 0){
			 res.send("<div align ='center'><h2>Invalid email</h2></div><br><br><div align='center'><a href='./newsLetter.html'>Try Again<a><div>");
		}else{
			res.sendFile(__dirname +'/newsRegistration.html');
			}
			var sql = `INSERT INTO news (email) VALUES ('${email}')`;
			con.query(sql, function (err, result) {
				if (err){
					console.log(err);
				}else{
					//res.sendFile(__dirname +'/newsRegistration.html');
				};
			});
		});
	});


app.listen(3001, () =>{
	console.log("Server running on port 3001");
});


