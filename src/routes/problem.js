/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');
const { errorCode, errorMessage } = require('../error');

const Problem = require('../models-build/problem').default;

const router = express.Router();

router.get('/', async (req, res) => {
    let page = req.query.page || 1;
    let each = req.query.each || 5;
    let problems = await Problem.find({
        skip: (page - 1) * each,
        take: each
    });
    for (let problem of problems) {
        await problem.loadRelatives();
    }

    res.render('problems.pug', {
        problem: problems.map(problem => ({
            pid: problem.pid,
            type: problem.type,
            title: problem.title,
            difficulty: problem.difficulty,
            ac_count: problem.ac_count,
            submit_cout: problem.submit_count,
            publisher: {
                uid: problem.publisher.uid,
                username: problem.publisher.username,
                nickname: problem.publisher.nickname
            }
        }))
    });
});

router.get('/:pid', async (req, res) => {
    const problem = await Problem.fromPid(req.params.pid);
    if (problem.is_public) {
        const problem_file = `${config.hoj.problemPath}/${req.params.pid}`;
        problem.info = yaml.safeLoad(fs.readFileSync(`${problem_file}/problem.yml`));
        res.render('problem.pug', { problem: problem });
    }
    else {
        res.redirect('/404');
    }
});

module.exports = router;

