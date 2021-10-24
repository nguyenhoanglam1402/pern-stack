const express = require("express");
const router = express.Router();
const {
    loginController,
  } = require("../controller/auth.controller.js");
router.post("/login", loginController);

module.exports = router;