'use strict';

const error = {
    server_error: { code: 1, msg: 'server internal error' },
    login_error: { code: 2, msg: 'wrong password or username' },
    signup_error: { code: 3, msg: 'wrong password or username' }
};

export default error;
