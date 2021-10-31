const express = require("express");
const router = express.Router();
const {
  registerSystemStaffController,
} = require("../controller/auth.controller");
const {
  changePasswordSystemStaffController,
  deleteSystemStaff,
  getProfileStaffById,
  updateStaff,
  getAllStaff
} = require("../controller/staff.controllers");
const {
  updateTrainerProfile,
  getTrainerProfile,
  getAllTrainer
} = require("../controller/trainer.controllers");
router.post("/accounts/register", registerSystemStaffController);
router.patch("/accounts/password/:id", changePasswordSystemStaffController);
router.delete("/accounts/delete/:id", deleteSystemStaff);
router.get("/trainer",getAllTrainer);
router.get("/staff", getAllStaff);
router.get("/trainer/profile/:id", getTrainerProfile);
router.put("/trainer/edit/:id", updateTrainerProfile);
router.get("/staff/profile/:id", getProfileStaffById);
router.put("/staff/edit/:id",updateStaff)
module.exports = router;
