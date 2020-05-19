'use strict';

const express = require('express');

const Submission = require('../models-build/submission').default;
const TestPoint = require('../models-build/test_point').default;

const router = express.Router();

router.get('/', async (req, res) => {
    let page = req.body.page || 1;
    let each = req.body.each || 5;
    let submission = await Submission.find({
        skip: (page - 1) * each,
        take: each
    });
    res.render('submissionlist.pug', { submission: submission });
});

router.get('/:sid', async (req, res) => {
    let submission = await Submission.fromSid(req.params.sid);
    let testPoints = await TestPoint.fromSid(req.params.sid);
    res.render('submission.pug', { submission: submission, testPoints: testPoints });
});

module.exports = router;

