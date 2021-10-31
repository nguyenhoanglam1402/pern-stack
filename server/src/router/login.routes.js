const express = require("express");
const router = express.Router();
const {
    loginController,
  } = require("../controller/auth.controller.js");
const { authToken } = require("../middleware/authentiacation.middleware.js");
router.post("/login", loginController);
// router.post("/logout",authToken,)

module.exports = router;