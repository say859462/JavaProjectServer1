const express = require("express");
const app = express();

const MailController = require("./MailController");
const mailController = new MailController();

const SMSController = require("./SMSController");
const smsController = new SMSController();

app.get("/:duration", (req, res) => {
  const { duration } = req.params;
  const { username, phone } = req.query;
  const timerId = setTimeout(async () => {
    // 在這裡執行你想要執行的動作

    // 例如印出使用者名稱
    if (username) {
      await mailController.sendMail(username);
      console.log("寄送電子郵件");
    }

    if (phone) {
      await smsController.sendSMS(phone);
      console.log("寄送手機簡訊");
    }
  }, duration * 1000); // 將秒數轉換為毫秒

  res.send("Timer started");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
