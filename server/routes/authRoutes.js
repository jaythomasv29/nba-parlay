const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router();

// baseUrl: "/api/auth/"
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout", logout);

module.exports = router;