#!usr/bin/env node

// SCOJ - An online judge system which supports Scratch.
// Copyright (c) 2019 Alex Cui.
// This project is released with AGPLv3.0

'use strict';

import express from 'express';
import config from './config.mjs';
import logger from './logger.mjs';
import { default as router_index } from './routes/index.mjs';
import { default as router_login } from './routes/login.mjs';
import { default as router_api } from './routes/api.mjs';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('static'), express.static('node_modules/@fortawesome'));

app.use('/', router_index);
app.use('/login', router_login);
app.use('/api', router_api);

app.listen(config.port, () => {
    logger.log(`Server: App listening on port ${config.port}!`);
});

