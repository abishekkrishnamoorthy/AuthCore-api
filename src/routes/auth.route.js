const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/auth.controller.js");
const authenticate = require("../middleware/authendicate.js");

router.post("/register", authController.registor);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;
