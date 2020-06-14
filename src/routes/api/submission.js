'use strict';

const { errorCode, errorMessage } = require('../../error');
const config = require('../../config');
const logger = require('../../logger');
const util = require('../../util');

const Submission = require('../../models-build/submission').default;
const TestPoint = require('../../models-build/test_point').default;
const User = require('../../models-build/user').default;
const Problem = require('../../models-build/problem').default;

/**
 * Get submissions.
 * @router get /api/v1/submission_list
 */
async function getSubmissionList(req, res) {
    let page = req.query.page || 1;
    let each = req.query.each || 15;
    let submissions = await Submission.find({
        skip: (page - 1) * each,
        take: each
    });
    for (let submission of submissions) {
        await submission.loadRelatives();
    }

    res.json({
        code: errorCode.SUCCESS,
        data: submissions.map(submission => ({
            sid: submission.sid,
            uid: submission.uid,
            pid: submission.pid,
            language: submission.language,
            status: submission.status,
            total_time: submission.total_time,
            total_space: submission.total_space,
            code_size: submission.code_size,
            user: {
                uid: submission.user.uid,
                username: submission.user.username,
                nickname: submission.user.nickname
            },
            problem: {
                pid: submission.problem.pid,
                title: submission.problem.title
            }
        }))
    });
}

/**
 * Get detail of submission.
 * @router get /api/v1/submission_info
 */
async function getSubmissionInfo(req, res) {
    if (req.query.sid === undefined) {
        res.json({
            code: errorCode.WRONG_PARAMS,
            msg: errorMessage[errorCode.WRONG_PARAMS]
        });
    }
    else {
        let submission = await Submission.fromSid(req.query.sid);
        await submission.loadUser();
        await submission.loadProblem();
        await submission.loadTestPoints();
        res.json({
            code: errorCode.SUCCESS,
            data: {
                sid: submission.sid,
                uid: submission.uid,
                pid: submission.pid,
                language: submission.language,
                status: submission.status,
                total_time: submission.total_time,
                total_space: submission.total_space,
                code_size: submission.code_size,
                user: {
                    uid: submission.user.uid,
                    username: submission.user.username,
                    nickname: submission.user.nickname
                },
                problem: {
                    pid: submission.problem.pid,
                    title: submission.problem.title
                },
                test_points: submission.test_points
            }
        });
    }
}

module.exports = {
    getSubmissionList,
    getSubmissionInfo
};
