const express = require("express");
const app = express();

app.use(express.json());

app.post("/schedule", (req, res) => {
  
  const { duration, username, phone } = req.query;

  // 將定時時間轉換為毫秒數
  const durationMs = duration * 1000;

  // 執行指定動作
  setTimeout(() => {
    console.log("時間到了！執行動作：", { username, phone });

    // 在這裡執行你想要的動作，例如發送簡訊、觸發其他服務等等

    res.status(200).json({ message: "動作已執行" });
  }, durationMs);
});

app.listen(3000, () => {
  console.log("伺服器已啟動，監聽埠號3000");
});
