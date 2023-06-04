module.exports.register = async function(data){
    //This allowsthe sql connection to make sure that the credentials inserted are not already in the system
    let result = await mysql.connection.query(`SELECT * FROM accounts WHERE username = '${data.userName}' AND password  = '${data.password}'`);
    if(Object.keys(result).length > 0){
        return "<div align ='center'><h2>Username or Email already Already has an Account</h2></div><br><br><div align='center'><a href='./registration.html'>Register Again<a><div>";
    }
    
    //After checking if the user is already in the system, inserts their credentials into the database
    await mysql.connection.query(`INSERT INTO accounts (email, username, password) VALUES ('${data.email}', '${data.userName}', '${data.password}')`);
    return path.join(__dirname, '../', './regSucess.html');
};