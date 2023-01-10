var mysql= require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'webdb2022'
});
db.connect();

module.exports = db;