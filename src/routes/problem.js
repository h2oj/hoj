/* eslint-disable no-unused-vars */
'use strict';

import express from 'express';
import path from 'path';
import fs from 'fs';
import config from '../config.js';
import sql from '../sql.js';

const router = express.Router();

const problem_difficulty = ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC'];

router.get('/', (req, res) => {
    const page = req.query.page || 1;
    sql.query('SELECT * FROM scoj.problem', (err, result, field) => {
        if (err) throw err;
        for (let i = 0; i < result.length; ++i) {
            result[i].tag = result[i].tag.split(',');
            result[i].difficulty_name = problem_difficulty[result[i].difficulty];
        }
        res.render('problemset.pug', { problem: result });
    });
});

router.get('/:pid', (req, res) => {
    sql.query(`SELECT * FROM scoj.problem WHERE pid='${req.params.pid}'`, (err, result, field) => {
        if (err) throw err;
        if (req.params.pid[0] == 'P') {
            const problem_path = `${config.problem_path}/${req.params.pid.substr(1)}`;
            const problem_info = fs.readFileSync(path.join(problem_path, 'problem.json'));
            //const problem_info = fs.readFileSync('index.js');
            result[0].info = problem_info;
            res.render('problem.pug', { problem: result[0] });
        }
    });
});

export default router;

