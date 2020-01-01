#!usr/bin/env node
/* eslint-disable no-unused-vars */

// HOJ - An online judge.
// Copyright (c) 2019 Alex Cui.
// This project is released with AGPLv3.0

'use strict';

import { createRequire } from 'module';
import express from 'express';
import bodyparser from 'body-parser';
import session from 'express-session';
import mysqlstore from 'express-mysql-session';
import typeorm from 'typeorm';
import logger from './logger.js';
import sql from './sql.js';
import config from '../config.js';
import { default as router_index } from './routes/index.js';
import { default as router_404 } from './routes/404.js';
import { default as router_api } from './routes/api.js';
import { default as router_login } from './routes/login.js';
import { default as router_problem } from './routes/problem.js';
import { default as router_submission } from './routes/submission.js';
import { default as router_user } from './routes/user.js';

global.__hoj = {
    config: config,
    sql: null
}

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

    app.set('view engine', 'pug');
    app.use(express.static('static'), express.static('node_modules'));
    app.use(express.static('static'), express.static('node_modules/@fortawesome'));

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));

    global.__hoj.sql = await connectDatabase();

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
        './models-build/user.js',
        './models-build/problem.js'
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
        logging: false,
        extra: {
            connectionLimit: 50
        }
    });
}

run();
