'use strict';

const express = require('express');

const Submission = require('../models-build/submission').default;
const TestPoint = require('../models-build/test_point').default;
const User = require('../models-build/user').default;
const Problem = require('../models-build/problem').default;

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('submissionlist.pug');
});

router.get('/:sid', async (req, res) => {
    let submission = await Submission.fromSid(req.params.sid);
    let testPoints = await TestPoint.fromSid(req.params.sid);
    res.render('submission.pug', { submission: submission, testPoints: testPoints });
});

module.exports = router;

