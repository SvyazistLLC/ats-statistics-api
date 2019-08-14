'use strict';

const Router = require('koa-router');
const statsController = require('./controllers/stats');
const intervalController = require('./controllers/interval');

const router = new Router();
router.get('/api/stats', statsController.getRow);
router.get('/api/stats/interval', intervalController.getInterval);

module.exports = router;
