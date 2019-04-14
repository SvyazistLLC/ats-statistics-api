const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// dotenv.config(); // /re

let connectionPool = null;

// console.log(process.env);
async function setupConnectionPool() {
  const mysqlConfigs = Object.entries(process.env)
    .filter(([name]) => {
      return name.match('MYSQL_');
    })
    .map(([name, value]) => {
      const paramName = name.replace(/(MYSQL_)(.*)/, (str, p1, p2) => {
        return p2.toLowerCase();
      });
      return [paramName, value];
    })
    .reduce((acc, [name, value]) => {
      acc[name] = value;
      return acc;
    }, {});
  connectionPool = mysql.createPool(mysqlConfigs);
}
class MysqlDb {
  static async query(sql, values) {
    if (!connectionPool) {
      await setupConnectionPool();
    }

    return connectionPool.query(sql, values);
  }
}

module.exports = MysqlDb;
