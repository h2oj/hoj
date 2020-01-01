'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('404.pug');
});

export default router;

