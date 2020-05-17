'use strict';

const errorCode = {
    SUCCESS: 200,
    SIGNUP_USERNAME_INVALID: 2001,
    SIGNUP_EMAIL_INVALID: 2002,
    SIGNUP_PASSWORD_EMPTY: 2003,
    SIGNUP_USERNAME_ERROR: 2004,
    LOGIN_ERROR: 2005,
    JUDGE_UNKNOWN_SUBMISSION_TYPE: 3001,
    JUDGE_UNKNOWN_LANGUAGE: 3002,
    JUDGE_UNKNOWN_FILE: 3003,
};

const errorMessage = {
    200: 'success',
    2001: 'the username has been taken',
    2002: 'the email has been taken',
    2003: 'the password cannot be empty',
    2004: 'the username is not available',
    2005: 'username or password error',
    3001: 'unknown submission type',
    3002: 'unknown language',
    3003: 'unknown file'
};

module.exports = {
    errorCode,
    errorMessage
};
