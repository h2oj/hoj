'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const scjudge = require('scratch-judge');

const { errorCode, errorMessage } = require('../error');
const config = require('../config');
const logger = require('../logger');
const util = require('../util');

const Submission = require('../models-build/submission').default;
const TestPoint = require('../models-build/test_point').default;
const { SubmissionStatus, TestPointStatus } = require('../models-build/status');

/**
 * Return enum of a status.
 * @param {string} str - Status.
 * @return {TestPointStatus} Status.
 */
function getPointStatusFromStr(str) {
    switch (str) {
    case 'AC': return TestPointStatus.ACCEPTED;
    case 'RE': return TestPointStatus.RUNTIME_ERROR;
    case 'TLE': return TestPointStatus.TIME_LIMIT_EXCEEDED;
    case 'MLE': return TestPointStatus.MEMORY_LIMIT_EXCEEDED;
    case 'WA': return TestPointStatus.WRONG_ANSWER;
    default: return TestPointStatus.JUDGEMENT_ERROR;
    }
}

/**
 * Judge.
 * @router /api/v1/judge
 */
async function judge(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');

        let fileExt;
        let language = req.body.lang;
        if (req.body.type === 'file') {
            fileExt = path.extname(req.file.originalname);
            if (!util.isSupportedFileExt(fileExt)) throw errorCode.JUDGE_UNKNOWN_FILE;
        }
        else if (req.body.type === 'text') {
            fileExt = util.languageToFileExt(language);
            if (fileExt === 'unknown') throw errorCode.JUDGE_UNKNOWN_LANGUAGE;
        }
        else {
            throw errorCode.JUDGE_UNKNOWN_SUBMISSION_TYPE;
        }

        const judgeInfo = {
            uid: 1,
            pid: req.body.pid,
            language: language,
            fileExt: fileExt
        };

        // Generate a new submission.
        let submission = await Submission.create({
            uid: judgeInfo.uid,
            pid: judgeInfo.pid,
            language: judgeInfo.language,
            status: SubmissionStatus.WAITING
        });
        await submission.save();

        const targetPath = path.join(config.hoj.submissionPath, submission.sid + fileExt);
        if (req.body.type === 'file') {
            fs.renameSync(req.file.path, targetPath);
        }
        else {
            fs.writeFileSync(targetPath, req.body.text);
        }

        const sourcePath = targetPath;

        // Load problem config.
        const problemConfig = yaml.safeLoad(fs.readFileSync(`${config.hoj.problemPath}/${judgeInfo.pid}/config.yml`));
        
        let testPoints = new Array();
        for (let i = 1; i <= problemConfig.test_count; i++) {
            let testPoint = await TestPoint.create({
                tpid: i,
                sid: submission.sid,
                status: TestPointStatus.WAITING
            });
            await testPoint.save();
            testPoints.push(testPoint);
        }

        for (let substack of problemConfig.substacks) {
            scjudge({
                projectFile: sourcePath,
                testFolder: `${config.hoj.problemPath}/${judgeInfo.pid}`,
                testPoints: problemConfig.test_count,
                fileNameFormat: `${problemConfig.problem}#{n}`,
                time: substack.time_limit,
                mem: substack.memory_limit,
                turbo: true
            }).then(event => {
                event.on('point', async result => {
                    testPoints[result.id - 1].status = getPointStatusFromStr(result.status);
                    testPoints[result.id - 1].time = result.usedTime;
                    testPoints[result.id - 1].space = result.usedMemory;
                    await testPoints[result.id - 1].save();
                }).on('error', error => {
                    logger.err(error);
                }).once('end', async results => { // eslint-disable-line no-unused-vars
                    let totalTime = 0;
                    let totalSpace = 0;
                    let status = SubmissionStatus.ACCEPTED;
                    for (let recordPoint of testPoints) {
                        totalTime += recordPoint.time;
                        totalSpace += recordPoint.space;
                        if (recordPoint.status != SubmissionStatus.ACCEPTED) {
                            status = SubmissionStatus.UNACCEPTED;
                        }
                    }
                    submission.status = status;
                    submission.total_time = totalTime;
                    submission.total_space = totalSpace;
                    await submission.save();
                });
            });
        }

        res.send({ code: errorCode.SUCCESS, data: {
            sid: submission.sid
        }});
    }
    catch (e) {
        logger.error(e);
        res.send({ code: e, msg: errorMessage[e] });
    }
}

module.exports = judge;
