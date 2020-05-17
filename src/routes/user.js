'use strict';

const express = require('express');

const User = require('../models-build/user').default;

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user_id) {
        const user = await User.fromUid(req.session.user_id);
        res.render('user.pug', { user: user });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/:uid', async (req, res) => {
    const user = await User.fromUid(req.params.uid);
    if (user) {
        res.render('user.pug', { user: user });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;

