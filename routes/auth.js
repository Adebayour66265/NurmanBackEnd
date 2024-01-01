const express = require("express");
const { register, login, forgotPassword } = require("../controllers/auth");

const router = express.Router();

// router.get("/register", register);
router.post("/register", register);
router.post("/login", login);
router.get("/forgot", forgotPassword);

module.exports = router;
