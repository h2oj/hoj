'use strict';

import Router from 'express';

const router = new Router;

router.get('/', (req, res) => {
    res.render('login.pug');
});

router.get('/:uid', (req, res) => {

});

export default router;

