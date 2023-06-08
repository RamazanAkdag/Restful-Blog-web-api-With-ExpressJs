const express = require("express");
const router = require("./routers");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(
  session({
    secret: "nedensizcegulmek", // Oturum kimlik doğrulaması için gizli bir anahtar
    resave: false, // Oturum değişiklikleri yapılmadığında yeniden kaydetme
    saveUninitialized: true, // İlk kez başlatılan oturumları kaydetme
    cookie: {
      maxAge: 3 * 60 * 1000, // 3 dakikalık session süresi (milisaniye cinsinden)
    },
  })
);
app.use(express.json());
app.use("/api", router);
app.listen(5000, () => {
  console.log("Server Çalışıyor");
});
