const passport = require('passport');
const LocalStrategy = require('passport-local');
let mysql = require('../Engines/mysql');
const axios = require('axios');

passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user.id);
  });


  passport.deserializeUser(function(id, done) {
    console.log('Deserializing user, ID:', id); // Log the ID
    mysql.connection.query('SELECT * FROM accounts WHERE id = ?', [id], function(err, results) {
      console.log('Query error:', err); // Log any error
      console.log('Query results:', results); // Log the results {
    if (err) {
      return done(err);
    }
    if (results.length === 0) {
     return done(null, false);
    }
    return done(null, results[0]);
  });
});


passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
    }, function (username, password, done) {
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
            project: "64d26009e12fd9e7aabce639",
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

