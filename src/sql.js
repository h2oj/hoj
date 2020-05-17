'use strict';

const mysql = require('mysql');
const config = require('./config.js');

const sql = mysql.createConnection({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_name
});

module.exports = sql;
