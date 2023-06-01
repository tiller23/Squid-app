const Config = require('./config/development');
const Routes = require('./routes');

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
app.use(sessions(Config.server));
app.use(cookieParser());
var con = mysql.createConnection(Config.mysql);


con.connect(function(err) {
	if(err){
	  console.log(err);
};
app.use(express.static(path.join(__dirname,'./')));

Routes(app('/app1/'));

//destroying express session, Logout button
Routes(app('/logout'));

Routes(app('/register'));

Routes(app('/login'));

Routes(app('/newsLetter'));


Routes(app.listen);
});

