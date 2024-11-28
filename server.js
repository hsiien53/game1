const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

// 中間件
app.use(cors());
app.use(bodyParser.json());

// API：新增歷史紀錄
app.post("/history", (req, res) => {
  const { player, winner, result, time } = req.body;
  const query = `INSERT INTO history (player, winner, result, time) VALUES (?, ?, ?, ?)`;
  db.run(query, [player, winner, result, time], function (err) {
    if (err) {
      res.status(500).send("無法新增歷史紀錄");
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

// API：獲取歷史紀錄
app.get("/history", (req, res) => {
  const query = `SELECT * FROM history ORDER BY id DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send("無法獲取歷史紀錄");
    } else {
      res.status(200).send(rows);
    }
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
});
