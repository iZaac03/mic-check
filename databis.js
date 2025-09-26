const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nfs'
});

connect.connect((err) => {
    if (err) {console.error('Error: ', err);
return;}
    console.log('Connected to the database!');
});

module.exports = connect;
