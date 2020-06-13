'use strict';

module.exports = {
    v1: {
        submission: require('./api/submission'),
        problem: require('./api/problem'),
        judge: require('./judge'),
        judgestatus: require('./judgestatus'),
    }
};
