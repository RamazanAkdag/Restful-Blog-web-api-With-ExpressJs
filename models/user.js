// user.js

const { json } = require("express");
const fs = require("fs");
const path = require("path");

// Kullanıcıları içeren db.json dosya yolu
const dbPath = path.join(__dirname, "..", "db.json");

// Kullanıcı modeli
class User {
  constructor(username, password, email) {
    this.id = 0;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  // Kullanıcıyı db.json dosyasına kaydetme
  save() {
    const db = fs.readFileSync(dbPath, "utf-8");
    const dbData = JSON.parse(db);

    const users = this.constructor.getAllUsers();
    this.id = dbData.maxUserId + 1;
    dbData.maxUserId = this.id;
    users.push(this);
    dbData.users = users;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  }

  // Tüm kullanıcıları db.json dosyasından getirme
  static getAllUsers() {
    const dbContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(dbContent);
    //console.log(data.users);
    return data.users || [];
  }
  static getByUsername(username) {
    const users = this.getAllUsers();
    return users.find((user) => user.username == username) || null;
  }
}

module.exports = User;
