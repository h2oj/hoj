'use strict';

const express = require('express');
const { constants } = require('buffer');
const { default: problem } = require('../models-build/problem');

const User = require('../models-build/user').default;

const Contest = require('../models-build/contest').default;

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user_id) {
        const nowUser = await User.fromUid(req.session.user_id);
        let page = req.query.page || 1;
        let each = req.query.each || 15;
        let contests = await Contest.find({
            skip: (page - 1) * each,
            take: each
        });
        for (let contest of contests) {
            await contest.loadRelatives();
        }
        res.render('contest.pug', { nowUser: nowUser, contest: contests.map(contest => ({
                cid: contest.cid,
                title: contest.title,
                type: contest.type,
                difficulty: contest.difficulty,
                user: {
                    uid: contest.publisher.uid,
                    username: contest.publisher.username,
                    nickname: contest.publisher.nickname
                }
            })) 
        });
    }else {
        res.render('login.pug');
    }
});

module.exports = router;
