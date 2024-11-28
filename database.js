// database.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tic-tac-toe.db", (err) => {
  if (err) {
    console.error("資料庫連接失敗：", err.message);
  } else {
    console.log("成功連接至 SQLite 資料庫！");
  }
});

// 建立歷史紀錄表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player TEXT,
      winner TEXT,
      result TEXT,
      time TEXT
    )
  `);
});

module.exports = db;
