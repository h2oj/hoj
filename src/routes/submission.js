'use strict';

const express = require('express');

const Submission = require('../models-build/submission').default;
const TestPoint = require('../models-build/test_point').default;
const User = require('../models-build/user').default;
const Problem = require('../models-build/problem').default;

const router = express.Router();

router.get('/', async (req, res) => {
    let page = req.query.page || 1;
    let each = req.query.each || 5;
    let submissions = await Submission.find({
        skip: (page - 1) * each,
        take: each
    });
    for (let submission of submissions) {
        submission.user = await User.fromUid(submission.uid);
        submission.problem = await Problem.fromPid(submission.pid);
    }
    res.render('submissionlist.pug', { submissions: submissions });
});

router.get('/:sid', async (req, res) => {
    let submission = await Submission.fromSid(req.params.sid);
    let testPoints = await TestPoint.fromSid(req.params.sid);
    res.render('submission.pug', { submission: submission, testPoints: testPoints });
});

module.exports = router;

