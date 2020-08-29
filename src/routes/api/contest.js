'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

const { errorCode, errorMessage } = require('../../error');
const config = require('../../config');
const logger = require('../../logger');
const util = require('../../util');

const User = require('../../models-build/user').default;
const Contest = require('../../models-build/contest').default;

async function contestList (req, res) {
    //TODO: Contest list API
}

module.exports = {
    contestList
};