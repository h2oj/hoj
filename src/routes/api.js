/* eslint-disable no-unused-vars */
'use strict';

import express from 'express';
import config from '../config.js';
import error from '../error.js';
import cryptojs from 'crypto-js';

let router = express.Router();

router.get('/sql/:query', (req, res) => {
    global.__hoj.sql.query(req.params.query, (err, result, field) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/signup', (req, res) => {
    global.__hoj.sql.query(`SELECT username FROM scoj.user_account where username='${req.body.username}'`, (err, result, field) => {
        if (err) throw err;
        if (result.length === 0) {
            global.__hoj.sql.query(`INSERT INTO scoj.user_account (uid, username, password, reg_time)
                    VALUE (${config.uid_next}, '${req.body.username}', MD5(CONCAT('${req.body.password}', '${config.md5_salt}')), NOW())`);
            global.__hoj.sql.query(`INSERT INTO scoj.user_info ((uid, nickname, avatar, sex, tag)
                VALUE (${config.uid_next}, '${req.body.username}', 'https://github.com/alexcui03/alexcui03.github.io/raw/master/avatar.jpg', 1, NOW())`);
            ++config.uid_next;
            res.redirect('/login');
        }
        else {
            res.json(error.signup_error);
        }
    });
});

router.post('/login', (req, res) => {
    global.__hoj.sql.query(`SELECT uid, username, password FROM scoj.user_account where username='${req.body.username}'`, (err, result, field) => {
        if (err) throw err;
        if (result.length === 1) {
            if (cryptojs.MD5(req.body.password + config.md5_salt).toString() === result[0].password) {
                global.__hoj.sql.query(`UPDATE scoj.user_account SET last_login=NOW() WHERE uid=${result[0].uid}`);
                req.session.username = req.body.username;
                res.redirect('/');
                return;
            }
        }
        res.json(error.login_error);
    });
});

export default router;
