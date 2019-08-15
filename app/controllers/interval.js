const { getFromInterval } = require('../models/stats');
let { isInt } = require('validator');

exports.getInterval = async ctx => {
  const { start, stop } = ctx.query;
  if (isInt(start) && isInt(stop)) {
    ctx.response.body = await getFromInterval(Math.floor(start), Math.floor(stop));
  } else {
    ctx.res.fail({ statusCode: 416, message: 'Validation error ' });
  }
};
