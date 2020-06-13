'use strict';

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
    let each = req.query.each || 5;
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
            submit_cout: problem.submit_count,
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
    
}

module.exports = {
    getProblemList,
    getProblemInfo
};
