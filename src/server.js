#!usr/bin/env node

// SCOJ - An online judge system which supports Scratch.
// Copyright (c) 2019 Alex Cui.
// This project is released with AGPLv3.0

'use strict';

import express from 'express';
import bodyparser from 'body-parser';
import session from 'express-session';
import mysqlstore from 'express-mysql-session';
import config from './config.js';
import logger from './logger.js';
import sql from './sql.js';
import { default as router_index } from './routes/index.js';
import { default as router_login } from './routes/login.js';
import { default as router_user } from './routes/user.js';
import { default as router_api } from './routes/api.js';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('static'), express.static('node_modules/@fortawesome'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

sql.connect(err => {
    if (err) {
        logger.err(`MySQL Error ${err.code}(${err.errno})`);
        logger.errln(err.message);
    }
    else {
        logger.log(`Server: Database connected to ${config.db_host}:${config.db_port} successfully.`);
    }
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: new (mysqlstore(session))({}, sql),
    cookie: {
        maxAge : 1000 * 60 * 60 * 24
    }
}));

app.use('/', router_index);
app.use('/login', router_login);
app.use('/user', router_user);
app.use('/api', router_api);

app.listen(config.server_port, () => {
    logger.log(`Server: App listening on port ${config.server_port}.`);
});

