const express = require("express");
const router = express.Router();
const auth = require("./auth");
const profile = require("./profile");
const posts = require("./posts");

router.use("/auth", auth);
router.use("/profile", profile);
router.use("/posts", posts);

module.exports = router;
