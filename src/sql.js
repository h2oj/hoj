'use strict';

import mysql from 'mysql';
import config from './config.js';

const sql = mysql.createConnection({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_name
});

export default sql;
