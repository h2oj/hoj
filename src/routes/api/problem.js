'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

const { errorCode, errorMessage } = require('../../error');
const config = require('../../config');
const logger = require('../../logger');
const util = require('../../util');

const User = require('../../models-build/user').default;
const Problem = require('../../models-build/problem').default;

/**
 * Get problems.
 * @router get /api/v1/problem_list
 */
async function getProblemList(req, res) {
    let page = req.query.page || 1;
    let each = req.query.each || 15;
    let problems = await Problem.find({
        skip: (page - 1) * each,
        take: each
    });
    for (let problem of problems) {
        await problem.loadRelatives();
    }
    res.json({
        code: errorCode.SUCCESS,
        data: problems.map(problem => ({
            pid: problem.pid,
            type: problem.type,
            title: problem.title,
            difficulty: problem.difficulty,
            ac_count: problem.ac_count,
            submit_count: problem.submit_count,
            class: problem.class,
            user: {
                uid: problem.publisher.uid,
                username: problem.publisher.username,
                nickname: problem.publisher.nickname
            }
        }))
    });
}

/**
 * Get problem details.
 * @router get /api/v1/problem_info
 */
async function getProblemInfo(req, res) {
    const problem = await Problem.fromPid(req.params.pid);
    if (problem && problem.is_public) {
        const problem_file = `${config.hoj.problemPath}/${req.params.pid}`;
        const problem_info = yaml.safeLoad(fs.readFileSync(`${problem_file}/problem.yml`));
        res.json({
            code: errorCode.SUCCESS,
            data: {
                pid: problem.pid,
                type: problem.type,
                title: problem.title,
                difficulty: problem.difficulty,
                ac_count: problem.ac_count,
                submit_count: problem.submit_count,
                user: {
                    uid: problem.publisher.uid,
                    username: problem.publisher.username,
                    nickname: problem.publisher.nickname
                },
                info: problem_info
            }
        });
    }
    else {
        res.redirect('/404');
    }
}

module.exports = {
    getProblemList,
    getProblemInfo
};
