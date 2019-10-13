'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.username) {
        res.render('user.pug', { nickname: req.session.username });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/:uid', (req, res) => {
    res.redirect('/login');
});

export default router;

