const mysql = require('mysql');
const dbConnection = mysql.createConnection({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root',        // MYSQL USERNAME
    password : '9831665180',    // MYSQL PASSWORD
    database : 'project_example'      // MYSQL DB NAME
});
module.exports = dbConnection;