#!usr/bin/env node

// SCOJ - An online judge system which supports Scratch.
// Copyright (c) 2019 Alex Cui.
// This project is released with Apache-2.0.
// For developer, you should write the following sentenses in "readme":
//   - This project is created by Alex Cui, and modified by <name>.
//   - This project requires Node.js.
//   - This project is released with Apache-2.0 license.
// Also, you should observe the following rules:
//   - At the buttom of the website page, you should keep "Based on SCOJ" and
//     a to SCOJ's github repository.

'use strict';

import path from 'path';
import express from 'express';
import config from './config.mjs';
import logger from './logger.mjs';
import { default as router_index } from './routes/index.mjs';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('static'), express.static('node_modules/@fortawesome'));

app.use('/', router_index);

app.listen(config.port, () => {
    logger.log(`Server: App listening on port ${config.port}!`);
});

