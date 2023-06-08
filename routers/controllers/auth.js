// Kullanıcı modelini import edin
const { hashPassword, comparePassword } = require("../../helpers/hashPassword");
const sendEmail = require("../../helpers/sendEmail");
const User = require("../../models/user");
const session = require("express-session");

// Kullanıcı kaydı yapacak olan controller fonksiyon
const registerController = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  // Kullanıcı adı ve şifre alanlarının boş olup olmadığını kontrol edin
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Kullanıcı adı ve şifre zorunludur." });
  }

  // Kullanıcı adının benzersiz olduğunu kontrol edin
  const existingUser = User.getByUsername(username);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Bu kullanıcı adı zaten kullanılmaktadır." });
  }

  const hashedPassword = await hashPassword(password);
  // Yeni kullanıcı nesnesi oluşturun
  const user = new User(username, hashedPassword, email);

  // Kullanıcıyı kaydedin
  user.save();

  // Oturum başlatma (session)
  req.session.user = user;

  // Başarılı yanıt gönderin
  res.status(201).json({ user });
};

const bcrypt = require("bcrypt");

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı kullanıcı adına göre veritabanından bulun
    const user = User.getByUsername(username);

    // Kullanıcı bulunamazsa hata döndür
    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    // Şifreleri karşılaştır
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Şifreler uyuşmuyorsa hata döndür
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Hatalı şifre." });
    }
    req.session.user = user;
    console.log(req.session);
    // Giriş başarılı, kullanıcı bilgilerini döndür
    return res.status(200).json({ message: "Giriş başarılı.", user });
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return res
      .status(500)
      .json({ message: "Bir hata oluştu.", error: error.message });
  }
}

function requireLogin(req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: "Giriş yapmanız gerekiyor." });
  }

  next();
}

const getResetMailController = (req, res) => {
  const mail = req.body.email;
  sendEmail(
    mail,
    "MERHABA NASILSINIZ",
    "email adresinize gelen bu linkle güzel işer yapabilrisiniz bunlar denemedir"
  );
  res.status(200).json({
    success: true,
    message: mail + "adresine gerekli e posta gönderildi..",
  });
};
module.exports = {
  registerController,
  loginController,
  requireLogin,
  getResetMailController,
};
