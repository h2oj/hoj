module.exports = {
    hoj: {
        host: '0.0.0.0',
        port: 5000,
        problemPath: './data/problem',
        contestPath: './data/contest',
        submissionPath: './data/submission',
        tempPath: './data/temp'
    },
    db: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'scoj111',
        password: 'scoj111',
        database: 'scoj',
    }
};
