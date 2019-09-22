'use strict';

import Router from 'express';

const router = new Router;

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/:uid', (req, res) => {
    res.redirect('/login');
});

export default router;

