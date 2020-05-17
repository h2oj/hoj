#!usr/bin/env node
/* eslint-disable no-unused-vars */

// HOJ - An online judge.
// Copyright (c) 2019 Alex Cui.
// This project is released with AGPLv3.0

'use strict';

const express = require('express');
const expressWs = require('express-ws');
const bodyparser = require('body-parser');
const session = require('express-session');
const session_store = require('session-file-store')(session);
const typeorm = require('typeorm');
const logger = require('./logger.js');
const sql = require('./sql.js');
const config = require('../config.js');
const router = require('./router');
const router_index = require('./routes/index.js');
const router_404 = require('./routes/404.js');
const router_api = require('./routes/api.js');
const router_login = require('./routes/login.js');
const router_problem = require('./routes/problem.js');
const router_submission = require('./routes/submission.js');
const router_user = require('./routes/user.js');

global.__hoj = {
    config: config,
    sql: null
};

function printWelcomeInfo() {
    console.log('--------------------------------------------------------------------------');
    console.log('     __  __            __                                    ____       __');
    console.log('    / / / /__  __ ____/ /_____ ____   ____ _ ___   ____     / __ \\     / /');
    console.log('   / /_/ // / / // __  // ___// __ \\ / __ `// _ \\ / __ \\   / / / /__  / / ');
    console.log('  / __  // /_/ // /_/ // /   / /_/ // /_/ //  __// / / /  / /_/ // /_/ /  ');
    console.log(' /_/ /_/ \\__, / \\__,_//_/    \\____/ \\__, / \\___//_/ /_/   \\____/ \\____/   ');
    console.log('        /____/                     /____/                                 ');
    console.log('--------------------------------------------------------------------------');
}

async function run() {
    printWelcomeInfo();

    const app = express();
    expressWs(app);

    app.set('view engine', 'pug');
    app.use(express.static('static'), express.static('node_modules'));
    app.use(express.static('static'), express.static('node_modules/@fortawesome'));

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));

    global.__hoj.sql = await connectDatabase();
    
    app.use(session({
        secret: 'hoj_be832c7d9a58530c',
        resave: true,
        saveUninitialized: true,
        store: new session_store(),
        cookie: {
            maxAge : 1000 * 60 * 60 * 24
        }
    }));

    app.use('/', router);
    app.use('/', router_index);
    app.use('/404', router_404);
    app.use('/api', router_api);
    app.use('/login', router_login);
    app.use('/problem', router_problem);
    app.use('/submission', router_submission);
    app.use('/user', router_user);

    /*
    app.use((req, res, next) => {
        res.redirect('/404');
    });
    */

    app.listen(config.hoj.port, config.hoj.host, () => {
        logger.log(`HOJ is listening on ${config.hoj.host}:${config.hoj.port}.`);
    });
}

async function connectDatabase() {
    const models = [
        require('./models-build/config').default,
        require('./models-build/user').default,
        require('./models-build/problem').default,
        require('./models-build/submission').default,
        require('./models-build/test_point').default
    ];
    return await typeorm.createConnection({
        type: config.db.type || 'mysql',
        host: config.db.host,
        port: config.db.port || 3306,
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        entities: models,
        synchronize: true,
        logging: true,
        extra: {
            connectionLimit: 50
        }
    });
}

run();
