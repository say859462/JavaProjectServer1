const express = require("express");
const app = express();

app.get("/:duration", async (req, res) => {
  const { duration } = req.params;
  const { username, phone } = req.query;

  // setTimeout(() => {
  //   // 在這裡執行你想要執行的動作
  //   // 例如印出使用者名稱

  // }, duration * 1000); // 將秒數轉換為毫秒
  
  res.send("Timer started");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
