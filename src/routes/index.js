'use strict';

const express = require('express');

const User = require('../models-build/user').default;

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user_id) {
        const user = await User.fromUid(req.session.user_id);
        res.render('index.pug', { user: user });
    }else {
        res.render('index.pug');
    }
});

module.exports = router;
