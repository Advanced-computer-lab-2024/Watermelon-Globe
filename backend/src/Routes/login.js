const express = require("express");
const router = express.Router();

const {
  loginUser,
  sendOtp,
  checkUserExistenceByEmailAndType,
  loginUserOTP,
} = require("../Controller/loginController");

router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/check-username/:userType", checkUserExistenceByEmailAndType);
router.post("/loginOTP", loginUserOTP);

module.exports = router;
