const  mysql = require('mysql');
const  connection = mysql.createConnection({
  host :  'localhost', // address of the server
  user :  'root', // username
  password :  'password',
  database :  'fullstack',
});

module.exports = connection;
