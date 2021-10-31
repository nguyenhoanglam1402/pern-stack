const express = require("express");
const router = express.Router();
const {
  getTrainerCourses,
  getListTraineesInClass,
  getTrainerProfile,
  updateTrainerProfile
} = require("../controller/trainer.controllers");
const { permission } = require("../middleware/authentiacation.middleware");

router.get("/courses/:id", permission, getTrainerCourses);
router.get("/courses/:id/classes/trainees", permission, getListTraineesInClass);
router.get("/profile/:id", permission, getTrainerProfile);
router.patch("/edit/:id",permission, updateTrainerProfile);
module.exports = router;
