const db = require('../lib/mysqldb');

class Stats {
  static async getRows(count) {
    const sql = 'select * From numberLocationCount order by time DESC LIMIT ?';
    const [stat] = await db.query(sql, Number(count));
    return stat;
  }
  static async getLimitDays(unixTime) {
    const sql = 'select * From numberLocationCount where time  > ?';
    const [stat] = await db.query(sql, Number(unixTime));
    return stat;
  }
  static async getFromInterval(startTime, endTime) {
    const sql = 'select * From numberLocationCount where time  <= ? and time  >= ?';
    const [stat] = await db.query(sql, [Number(endTime), Number(startTime)]);
    return stat;
  }
}

module.exports = Stats;
