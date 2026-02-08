const changepasswordController = require("../../controllers/auth/password.controller");
const express = require("express");
const router = express.Router();

router.post("/changepassword", changepasswordController.changepassword);

module.exports = router;