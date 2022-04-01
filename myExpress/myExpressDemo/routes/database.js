// database.js
// 连接Mysql

var mysql = require("mysql");
// 数据库连接配置
var pool = mysql.createPool({
  host: "47.107.227.0", // 数据库的地址
  user: "longinus", // 数据库用户名
  password: "123456", // 数据库密码
  database: "test", // 数据库名称
});

// 对数据库进行增删改查操作的基础
function query(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return;
    }
    connection.query(sql, (err, rows) => {
      callback(err, rows);
      connection.release();
    });
  });
}

exports.query = query;
