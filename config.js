module.exports = {
    hoj: {
        host: '0.0.0.0',
        port: 5000,
        problemPath: './data/problem',
        submissionPath: './data/submission',
        tempPath: './data/temp'
    },
    db: {
        type: 'mysql',
        host: 'localhost',
        port: 25020,
        username: 'root',
        password: 'root',
        database: 'scoj',
    }
};
