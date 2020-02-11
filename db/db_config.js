var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12322253',
    password: '2NjKB3ZwMi',
    database: 'sql12322253'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection; 
