const express = require("express");
const router = express.Router();

const {
    loginUser,
} = require("../Controller/loginController");


router.post("/login", loginUser);

module.exports = router;
