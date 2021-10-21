const express = require("express");
const {
  getFriendTraineeController,
} = require("../controller/list-trainee.controller");
const {authToken, authRole} =require("../middleware/authentiacation.middleware");
const router = express.Router();

router.get("/course/friends/:courseName",authToken, authRole("Trainee"), getFriendTraineeController);

module.exports = router;
