module.exports = function(app){

    app.get('/alive', function(req, res){ return res.send('OK'); });

    app.get('/app1', (req, res) => { res.sendFile(path.join(__dirname + '/index.html')); })


};