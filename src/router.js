const express = require('express');
const expressWs = require('express-ws');

const { fileUploadMiddleware } = require('./util');

const api = {
    v1: {
        ws: {
            //judgestatus: require('./routes/ws/judgestate')
        },
        judge: require('./routes/judge'),
        judgestatus: require('./routes/judgestatus')
    }
};

let router = express.Router();
expressWs(router);

router.post('/api/v1/judge', fileUploadMiddleware.single('file'), api.v1.judge);
router.get('/api/v1/judgestatus', api.v1.judgestatus);
//router.ws('/api/v1/ws/judgestatus', api.v1.judgestatus);

module.exports = router;
