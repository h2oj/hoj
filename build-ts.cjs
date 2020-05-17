const fs = require('fs');

/*
fs.readdir('./src/models-build/', (err, files) => {
    if (err) throw err;
    files.forEach((val, idx) => {
        let new_name = val.replace(/(.*)\.js$/g, '$1.cjs');
        fs.renameSync('./src/models-build/' + val, './src/models-build/' + new_name);
    });
});
*/
