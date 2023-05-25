const http = require("http");
const querystring = require("querystring");

class SMSController {
  constructor() {
    this.hostUsername = "say859462";
    this.hostPassword = "say1472580";
  }

  // 發送手機驗證碼到使用者手機
  sendSMS(phoneNumber) {
    try {
      const message =
        phoneNumber +
        "使用者你好，提醒您已到更換密碼的時間，請記得更換您的密碼。";

      const postData = querystring.stringify({
        username: this.hostUsername,
        password: this.hostPassword,
        mobile: phoneNumber,
        message: message,
      });

      const options = {
        hostname: "api.twsms.com",
        path: "/json/sms_send.php",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const req = http.request(options, (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {});
      });

      req.on("error", (error) => {
        console.error("無法連接 TwSMS API Server!");
      });

      req.write(postData);
      req.end();
    } catch (error) {
      console.error("程式錯誤!");
    }
  }

  // UrlEncode Function
  urlEncode(src) {
    return encodeURIComponent(src);
  }
}

module.exports = SMSController;
