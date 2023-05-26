const nodemailer = require("nodemailer");

class MailController {
  constructor() {
    this.senderEmail = "sw710407@gmail.com";
    this.apiKey = "dfmiylxxxzixdkds"; // 電子郵件 API 金鑰
  }

  sendMail(userMail) {
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
      text:
        userMail + "使用者您好，提醒您已到更換密碼的時間，請記得更換您的密碼。",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("電子郵件驗證碼寄送失敗:", error);
      } else {
        console.log("電子郵件驗證碼寄送成功!");
      }
    });
  }
}

module.exports = MailController;
