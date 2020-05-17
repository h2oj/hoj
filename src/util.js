'use strict';

const multer = require('multer');

const config = require('./config');

const fileUploadMiddleware = multer({ dest: config.hoj.tempPath });

const supportedFileExt = [
    '.cc', '.cxx', '.cpp',
    '.c',
    '.sb', '.sb2', '.sb3'
];

const isSupportedFileExt = (fileExt) => {
    return supportedFileExt.includes(fileExt);
};

const languageToFileExt = (lang) => {
    switch (lang) {
    case 'cpp98':
    case 'cpp11':
    case 'cpp14':
    case 'cpp17':
    case 'cpp20': return '.cpp';
    case 'js': return '.js';
    case 'scratch3': return '.sb3';
    default: return 'unknown';
    }
};

module.exports = {
    fileUploadMiddleware,
    supportedFileExt,
    isSupportedFileExt,
    languageToFileExt
};
