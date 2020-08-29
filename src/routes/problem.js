/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');
const { errorCode, errorMessage } = require('../error');

const Problem = require('../models-build/problem').default;
const User = require('../models-build/user').default;

const router = express.Router();

router.get('/', async (req, res) => {
    let page = req.query.page || 1;
    let each = req.query.each || 15;
    let problems = await Problem.find({
        skip: (page - 1) * each,
        take: each
    });
    if (req.session.user_id){
        const nowUser = await User.fromUid(req.session.user_id);
        res.render('problems.pug', { nowUser: nowUser,
            problem: problems.map(
                problem => ({
                    pid: problem.pid,
                    type: problem.type,
                    title: problem.title,
                    difficulty: problem.difficulty,
                    ac_count: problem.ac_count,
                    submit_count: problem.submit_count,
                    class: problem.class
                }
            ))
        });
    }
});

router.get('/:pid', async (req, res) => {
    const problem = await Problem.fromPid(req.params.pid);
    if (req.session.user_id) {
        const problem_file = `${config.hoj.problemPath}/${req.params.pid}`;
        problem.info = yaml.safeLoad(fs.readFileSync(`${problem_file}/problem.yml`));
        problem.config = yaml.safeLoad(fs.readFileSync(`${problem_file}/config.yml`));
        res.render('problem.pug', { problem: problem ,user: await User.fromUid(problem.uid), nowUser: await User.fromUid(req.session.user_id)});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;

