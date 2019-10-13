'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/:uid', (req, res) => {
    res.redirect('/login');
});

export default router;

