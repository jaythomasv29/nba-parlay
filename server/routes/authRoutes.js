const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/authController");
const router = express.Router();

// baseUrl: "/api/auth/"
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;