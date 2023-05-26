const express = require("express");
const app = express();
const cron = require("node-cron");

// 設定伺服器的監聽埠號
const port = 3000;

// 處理客戶端的請求
app.get("/schedule", (req, res) => {
  const { duration, username } = req.query;

  // 解析定時時間
  const durationInMinutes = parseInt(duration);

  // 計算時間差（以毫秒為單位）
  const delayInMilliseconds = durationInMinutes * 60 * 1000;

  // 設定cron job，在指定時間到達時執行指定的動作
  const task = cron.schedule(`*/${durationInMinutes} * * * *`, () => {
    // 執行你想要執行的動作
    console.log(`Time's up for ${username}!`);

    // 停止cron job
    task.stop();
  });

  // 回傳回應給客戶端
  res.send("Schedule created!");
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
