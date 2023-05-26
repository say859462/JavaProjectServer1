const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");

class SMSController {
  constructor() {
    this.sms_gw = null;
    this.HostUsername = "say859462";
    this.HostPassword = "say1472580";
  }

  sendSMS(phoneNumber) {
    try {
      const message =
        phoneNumber + `使用者您好，您的定時提醒已到時間，請記得更換您的密碼`;

      const postData = querystring.stringify({
        username: this.HostUsername,
        password: this.HostPassword,
        mobile: phoneNumber,
        message: message,
      });
      const options = {
        hostname: "api.twsms.com",
        port: 443,
        path: "/json/sms_send.php",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, (res) => {
        let responseData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          console.log("驗證碼寄送成功");
        });
      });

      req.on("error", (e) => {
        console.error("無法連接 TwSMS API Server!", e);
      });

      req.write(postData);
      req.end();
    } catch (error) {
      console.error("程式錯誤!", error);
    }
  }
}

class MailController {
  constructor() {
    this.senderEmail = "sw710407@gmail.com";

    this.apiKey = "dfmiylxxxzixdkds"; // 電子郵件API金鑰
  }

  // 寄送驗證碼(email)
  sendMail(userMail) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: this.senderEmail,
          pass: this.apiKey,
        },
      });

      const mailOptions = {
        from: this.senderEmail,
        to: userMail,
        subject: "Doge Password Management",
        text: userMail + `使用者您好，您的定時提醒已到時間，請記得更換您的密碼`,
      };

      transporter.sendMail(mailOptions);

      console.log("電子郵件驗證碼寄送成功!");
    } catch (error) {
      console.error("寄送電子郵件發生錯誤:", error);
    }
  }
}

app.use(express.json());
// 使用範例
const mailController = new MailController();
const smsController = new SMSController();
app.post("/schedule", (req, res) => {
  const { duration, username, phone } = req.query;

  // 將定時時間轉換為毫秒數
  const durationMs = duration * 1000;

  // 執行指定動作
  setTimeout(() => {
    console.log("時間到了！執行動作：", { username, phone });

    // 在這裡執行你想要的動作，例如發送簡訊、觸發其他服務等等
    if (phone) smsController.sendSMS(phone);
    if (username) mailController.sendMail(username);
  }, durationMs);

  res.status(200).json({ message: "動作已執行" });
});

app.listen(3000, () => {
  console.log("伺服器已啟動，監聽埠號3000");
});
