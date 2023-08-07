const passport = require('passport');
const LocalStrategy = require('passport-local');
let mysql = require('../Engines/mysql');
const axios = require('axios');

passport.serializeUser(function(user, done) {
    done(null, user.id, user.username);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
    }, function (username, password, done) {
    console.log("running");
    const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
    mysql.connection.query(query, [username, password], function(err, results) {
        if (err) { 
            console.log("this passport function is not working");

            return done(err);
        }
        if (results.length === 0) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        axios.post('https://app.mysquid.io/api/v1/track', {
            project: "6480ea9e2cfb668a330b87a5",
            event: "identify",
            label: "recurring friend",
            context: {
                traits: {
                    name: username,
                    email: username + "@gmail.com"
                }
            }
        });
        // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
        return done(null, results[0]);
    });
}));

