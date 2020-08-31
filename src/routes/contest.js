'use strict';

const express = require('express');
const { constants } = require('buffer');
const { default: problem } = require('../models-build/problem');
const { route } = require('./submission');
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');

const User = require('../models-build/user').default;

const Contest = require('../models-build/contest').default;
const Problem = require('../models-build/problem').default;

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
        res.render('contests.pug', { nowUser: nowUser, contest: contests.map(contest => ({
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

router.get("/:cid", async (req, res)=> {
    if (req.session.user_id) {
        const contest = await Contest.fromCid(req.params.cid);
        const contest_file = `${config.hoj.contestPath}/${req.params.cid}`;
        //contest.info = yaml.safeLoad(fs.readFileSync(`${contest_file}/problem.yml`));
        //console.log(`${contest_file}/problem.yml`)
        contest.info = yaml.safeLoad(fs.readFileSync(`${contest_file}/config.yml`));
        //console.log(contest.info)
        var problems = [];
        for (var i=0; i<contest.info.problems.length; i++){
            problems.push(await Problem.fromPid(contest.info.problems[i].pid));
        }
        console.log(problems)
        res.render('contest.pug', { contest: contest, nowUser: await User.fromUid(req.session.user_id), user: await User.fromUid(contest.uid), problems:  problems});
    } else {
        res.redirect('/login')
    }
});

module.exports = router;
