'use strict';

import express from 'express';
import sql from '../sql.js';

const router = express.Router();

router.get('/', (req, res) => {
    sql.query(`SELECT * FROM problem WHERE pid=${}`);
    res.render('problemset.pug');
});

router.get('/:pid', (req, res) => {
    res.render('problem.pug');
});

export default router;

