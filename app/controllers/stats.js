const { getRows, getLimitDays } = require('../models/stats');
let { isInt } = require('validator');

const daysToSeconds = (days)=>{
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  return Math.floor(currentDate.getTime() / 1000);
};


exports.getRow = async ctx => {
  const { limitdays, count } = ctx.query;
  if (count) {
    if (isInt(count, { min: 1, max: 800 })) {
      ctx.response.body = await getRows(count);
    } else {
      ctx.res.fail({ statusCode: 416, message: 'Validation error: min: 1, max: 800 ' });
    }
  }
  if (limitdays) {
    if(isInt(limitdays, { min: 1, max: 800 })) {
      ctx.response.body =  await getLimitDays(daysToSeconds(limitdays));
    } else {
      ctx.res.fail({ statusCode: 416, message: 'Validation error: min: 1, max: 800 ' });
    }
    return;
  }
  ctx.response.body =  await getLimitDays(daysToSeconds(30));
};
