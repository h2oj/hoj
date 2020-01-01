/* eslint-disable no-unused-vars */
'use strict';

import express from 'express';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import config from '../config.js';

const router = express.Router();

const problem_difficulty = ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC'];

router.get('/', (req, res) => {
    const page = req.query.page || 1;
    global.__hoj.sql.query('SELECT * FROM scoj.problem', (err, result, field) => {
        if (err) throw err;
        for (let i = 0; i < result.length; ++i) {
            result[i].tag = result[i].tag.split(',');
            result[i].difficulty_name = problem_difficulty[result[i].difficulty];
        }
        res.render('problemlist.pug', { problem: result });
    });
});

router.get('/:pid', (req, res) => {
    global.__hoj.sql.query(`SELECT * FROM scoj.problem WHERE pid='${req.params.pid}'`, (err, result, field) => {
        if (err) throw err;
        if (req.params.pid[0] == 'P') {
            const problem_path = `${config.problem_path}/${req.params.pid.substr(1)}`;
            const problem_info = yaml.safeLoad(fs.readFileSync(path.join(problem_path, 'problem.yml')));
            //const problem_info = fs.readFileSync('index.js');
            result[0].info = problem_info;
            res.render('problem.pug', { problem: result[0] });
        }
    });
});

/*
router.use((req, res, next) => {
    if (req.url.includes('vs')) {
        res.redirect(`/monaco-editor/min/vs/${req.url.substr(req.url.indexOf('vs') + 3)}`);
    }
});
*/

export default router;

