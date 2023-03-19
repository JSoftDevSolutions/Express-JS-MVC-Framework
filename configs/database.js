const mysql = require('mysql');
const config = require('../configs/base_config');
let database = {
    mysql: ()=>{
        let mysql_connection = mysql.createConnection(config.mysql_connection);
        return mysql_connection;
    }
};

module.exports = database;