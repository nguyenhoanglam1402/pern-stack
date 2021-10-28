const express = require("express");
const {
  getFriendTraineeController,
  getCoursesOfTrainee,
} = require("../controller/list-trainee.controller");
const {
  getTraineeProfile
} = require("../controller/trainee.controller");
const { permission } = require("../middleware/authentiacation.middleware");
const router = express.Router();

router.get("/courses/friends/:courseName", permission, getFriendTraineeController);
router.get("/courses/:id", permission, getCoursesOfTrainee);
router.get("/profile/:id", permission, getTraineeProfile );

module.exports = router;
