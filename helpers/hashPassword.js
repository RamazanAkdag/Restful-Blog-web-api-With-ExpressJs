const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // Hashleme için kullanılacak tuz miktarı

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Şifre hashlenirken bir hata oluştu.");
  }
}
async function comparePassword(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Şifre karşılaştırılırken bir hata oluştu.");
  }
}

module.exports = { hashPassword, comparePassword };
