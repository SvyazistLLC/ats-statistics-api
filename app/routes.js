'use strict';

const Router = require('koa-router');
const statsController = require('./controllers/stats');

const router = new Router();
router.get('/api/stats', statsController.getRow);


module.exports = router;
