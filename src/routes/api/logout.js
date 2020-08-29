'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

const { errorCode, errorMessage } = require('../../error');
const config = require('../../config');
const logger = require('../../logger');
const util = require('../../util');

const User = require('../../models-build/user').default;
const Problem = require('../../models-build/problem').default;

async function logout(req, res) {
    if (req.session.user_id !== undefined) {
        delete req.session.user_id;
    }
    res.redirect('/');
}

module.exports = {
    logout
};
