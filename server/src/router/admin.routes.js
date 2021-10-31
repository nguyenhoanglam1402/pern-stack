const express = require("express");
const router = express.Router();
const {registerSystemStaffController} = require('../controller/auth.controller');
const {changePasswordSystemStaffController} = require("../controller/staff.controllers")

router.post("/accounts/register", registerSystemStaffController);
router.patch("/staff/password/:id",changePasswordSystemStaffController);
router.delete("/accounts/delete/:id");

module.exports=router;