/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');

const Problem = require('../models-build/problem').default;

const router = express.Router();

router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    const problems = await Problem.findPublic();
    res.render('problemlist.pug', { problem: problems });
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

