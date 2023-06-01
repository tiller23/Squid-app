const path = require('path');

module.exports.logout = function(req, res){
    return req.session.destroy(function(err) {
        if(err) {
           console.log(err);
      } else {
          res.redirect('/app1/index.html');
      }
   });
};