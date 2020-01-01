'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('submissionlist.pug');
});

router.get('/:sid', (req, res) => {
    res.render('submission.pug');
});

export default router;

