

module.exports.alive = function(req, res){
    return res.send('OK'); 
};

module.exports.home = function(req, res){
    return res.sendFile(__dirname + '/index.html'); 
};
