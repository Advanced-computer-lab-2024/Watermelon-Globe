const express = require("express");
const router = express.Router();

const { loginUser, sendOtp } = require("../Controller/loginController");

router.post("/login", loginUser);
router.post("/send-otp", sendOtp);

module.exports = router;
