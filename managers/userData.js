let mysql = require('../Engines/mysql');
const passport = require('passport');
let LocalStrategy = require('passport-local');
const axios = require('axios');




module.exports.login = function(data, req, res){
    let username = data.userName;
    let password = data.password;
    passport.use(new LocalStrategy(function (username, password, done) {
        const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
        mysql.connection.query(query, [username, password], function(err, results) {
            if (err) { 
                return done(err);
            }
    
            if (results.length === 0) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            
            // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
            return done(null, results[0]);
        });
    }));
    return new Promise(function(resolve, reject){
        mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password = '${data.password}'`, function(err, results, fields){
            passport.authenticate('local');
            if(err){ return reject(err); }
            if(!results.length){ return resolve(res.render('loginFail.html')) }
            axios.post('https://app.mysquid.io/api/v1/track', {
                project: "6480ea9e2cfb668a330b87a5",
                event: "identify",
                label: "recurring friend",
                context: {
                    traits: {
                        name: username,
                        email: password
                    }
                }
            });
            return res.render('loginSucess.html');
        });
    });
};