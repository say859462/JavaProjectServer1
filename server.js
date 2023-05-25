const express = require("express");

const app = express();

app.get("/timer/:duration/:username", (req, res) => {
  const { duration, username } = req.params;

  setTimeout(() => {
    // 在這裡執行你想要執行的動作

    // 例如印出使用者名稱
    console.log("執行動作 - 使用者：", username);
  }, duration * 1000); // 將秒數轉換為毫秒

  res.send("Timer started");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
