const express = require("express");
const app = express();

const MailController = require("./MailController");
const mailController = new MailController();

const SMSController = require("./SMSController");
const smsController = new SMSController();

const timers = {};
app.get("/:duration/:username?/:phone?", (req, res) => {
  const { duration, username, phone } = req.params;

  const timerId = setTimeout(() => {
    // 在這裡執行你想要執行的動作

    if (phone != "null") {
      smsController.sendSMS(phone);
    }

    delete timers[timerId];
  }, duration * 1000); // 將秒數轉換為毫秒

  timers[timerId] = {
    username,
    startTime: new Date(),
  };

  res.send("Timer started");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
