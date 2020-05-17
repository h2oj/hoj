const error = require('../error');;

const Submission = require('../models-build/submission').default;
const TestPoint = require('../models-build/test_point').default;

async function judgestatus(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');

        
        
        res.send({ code: 0 });
    }
    catch (e) {
        res.send({ code: e, msg: error[e] });
    }
}

module.exports = judgestatus;
