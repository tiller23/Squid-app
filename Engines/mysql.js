let mysql = require('mysql');
const MYSQLENGINE = {};

MYSQLENGINE.init = function(settings){
    MYSQLENGINE.connection = mysql.createConnection(settings);
    MYSQLENGINE.connection.connect(function(err){
        if(err){    return MYSQLENGINE.onError(err);}
    });
};

MYSQLENGINE.onError = function(err){
    console.error(err);
    process.exit(1);
};

module.exports = MYSQLENGINE;

