const path = require('path');

//The most simple controllers, bring the index page to life
module.exports.alive = function(req, res){
    return res.send('OK'); 
};

module.exports.home = function(req, res){
    return res.render('index.html'); 
};
