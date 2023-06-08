const express = require("express");
const {
  registerController,
  loginController,
  getResetMailController,
} = require("./controllers/auth");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgotpassword", getResetMailController);

module.exports = router;
