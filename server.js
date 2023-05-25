const express = require("express");

const app = express();

app.get("/:duration/:username?/:phone?", (req, res) => {
  const { duration, username, phone } = req.params;

  setTimeout(() => {
    // 在這裡執行你想要執行的動作

    // 例如印出使用者名稱
       if (username) {
         // 使用者名稱參數存在
         console.log("使用者名稱:", username);
       }

       if (phone) {
         // 電話號碼參數存在
         console.log("電話號碼:", phone);
       }

  }, duration * 1000); // 將秒數轉換為毫秒

  res.send("Timer started");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
