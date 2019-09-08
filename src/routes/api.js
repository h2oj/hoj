'use strict';

import Router from 'express';

const router = new Router;

router.post('/register', (req, res) => {
    res.end('<p>ELLL</p>');
});

router.post('/login', (req, res) => {
    res.end('<p>LEEE</p>');
});

export default router;
