'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('404.pug');
});

module.exports = router;

