const express = require("express");
const {
  getCoursesOfTrainee,
} = require("../controller/list-trainee.controller");
const{getListTraineesInClassByName}=require("../controller/trainer.controllers");
const {
  getTraineeProfile
} = require("../controller/trainee.controller");
const { permission } = require("../middleware/authentiacation.middleware");
const router = express.Router();

router.get("/courses/:id/friends/:className", permission, getListTraineesInClassByName);
router.get("/courses/:id", permission, getCoursesOfTrainee);
router.get("/profile/:id", permission, getTraineeProfile );

module.exports = router;
