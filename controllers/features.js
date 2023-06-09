const path = require('path');

module.exports.success = function(req, res){
    res.render(path.join(__dirname, '../', './loginSucess.html'));
}

module.exports.shop = function(req, res){
    return res.render(path.join(__dirname, '../', './shopping.html'));
};

module.exports.contacts = function(req, res){
    return res.render(path.join(__dirname, '../', './contact.html'));
};

module.exports.about = function(req, res){
    return res.render(path.join(__dirname, '../', './aboutMe.html'));
};