const express = require("express");
const {
  getFriendTraineeController,
  getCoursesOfTrainee,
} = require("../controller/list-trainee.controller");
const { permission } = require("../middleware/authentiacation.middleware");
const router = express.Router();

router.get("/courses/friends/:courseName", permission, getFriendTraineeController);
router.get("/courses/:id", permission, getCoursesOfTrainee);

module.exports = router;
