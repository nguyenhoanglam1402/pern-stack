const express = require("express");
const router = express.Router();
const {registerSystemStaffController} = require('../controller/auth.controller');
const {changePasswordSystemStaffController,deleteSystemStaff} = require("../controller/staff.controllers");
const {updateTrainerProfile} = require("../controller/trainer.controllers")
router.post("/accounts/register", registerSystemStaffController);
router.patch("/accounts/password/:id",changePasswordSystemStaffController);
router.delete("/accounts/delete/:id",deleteSystemStaff);
router.put("/trainer/edit/:id",updateTrainerProfile)
module.exports=router;