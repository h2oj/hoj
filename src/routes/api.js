/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const cryptojs = require('crypto-js');
const typeorm = require('typeorm');
const config = require('../config');
const logger = require('../logger');
const { errorCode, errorMessage } = require('../error');

const User = require('../models-build/user.js').default;

let router = express.Router();

router.get('/sql/:query', (req, res) => {
    global.__hoj.sql.query(req.params.query, (err, result, field) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/signup', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        // check if the username or the email was taken
        let user = await User.fromName(req.body.username);
        if (user) throw errorCode.SIGNUP_USERNAME_INVALID;
        user = await User.fromEmail(req.body.email);
        if (user) throw errorCode.SIGNUP_EMAIL_INVALID;

        // check if the password is available
        if (req.body.password.trim() === '') throw errorCode.SIGNUP_PASSWORD_EMPTY;

        // check if the username is available
        if (!RegExp(/^[a-zA-Z0-9_]+$/).test(req.body.username)) throw errorCode.SIGNUP_USERNAME_ERROR;
        
        // generate the salt (64bit)
        const crypto_salt = cryptojs.lib.WordArray.random(8).toString();
        
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            crypto_salt: crypto_salt,
            password: cryptojs.MD5(req.body.password + crypto_salt).toString(),
            reg_time: Math.floor((new Date()).getTime() / 1000)
        });
        await user.save();
        
        logger.log(`New account: ${user.username}(uid=${user.uid})`);

        res.send({ code: errorCode.SUCCESS });
    }
    catch (e) {
        res.send({ code: e, message: errorMessage[e] });
    }
});

router.post('/login', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        // check if the username is available
        let user = await User.fromName(req.body.username);
        if (!user) throw errorCode.LOGIN_ERROR;

        // check the password
        const password = cryptojs.MD5(req.body.password + user.crypto_salt).toString();
        if (password !== user.password) throw errorCode.LOGIN_ERROR;

        // update login time
        user.last_login = Math.floor((new Date()).getTime() / 1000);
        user.save();

        // eslint-disable-next-line require-atomic-updates
        req.session.user_id = user.uid;
        
        res.send({ code: errorCode.SUCCESS });
    }
    catch (e) {
        res.send({ code: e, message: errorMessage[e] });
    }
});

router.get('/logout', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.session.user_id !== undefined) {
        delete req.session.user_id;
    }
    res.send({ code: 0 });
});

module.exports = router;
