const path = require('path');

module.exports.success = function(req, res){
    res.render('loginSucess.html');
}

module.exports.shop = function(req, res){
    return res.render('shopping.html');
};

module.exports.contacts = function(req, res){
    return res.render('contact.html');
};

module.exports.about = function(req, res){
    return res.render('aboutMe.html');
};