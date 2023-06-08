const express = require("express");
const { requireLogin } = require("./controllers/auth");
const router = express.Router();

router.get("/", requireLogin, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.session.user,
  });
});

module.exports = router;
