const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, message) => {
  try {
    // E-posta gönderimi için SMTP transport ayarlarını yapın
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "akdagramazan586@gmail.com", // Gönderen e-posta adresi
        pass: "funcupkagcjxanug", // Gönderen e-posta şifresi
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // E-posta gönderim seçeneklerini ayarlayın
    const mailOptions = {
      from: "akdagramazan586@gmail.com", // Gönderen e-posta adresi
      to: email, // Alıcı e-posta adresi
      subject: subject, // E-posta konusu
      text: message, // E-posta metni
    };

    // E-postayı gönderin
    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
  }
};

module.exports = sendEmail;
