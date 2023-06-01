const path = require('path');

module.exports.alive = function(req, res){
    return res.send('OK'); 
};

module.exports.home = function(req, res){
    return res.sendFile(path.join(__dirname + '/index.html')); 
};
