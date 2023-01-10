var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'nodejs',
    password: 'nodejs',
    database: 'webdb2022'
});

connection.connect();

connection.query('SELECT * from topic', function (error,results, fields){
    if (error) {
        console.log(error);
    }
    console.log(results);
    //console.log(fields);
});

connection.end();