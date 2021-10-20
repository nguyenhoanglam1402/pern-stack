const express = require("express");
const {
  getFriendTraineeController,
} = require("../controller/list-trainee.controller");
const router = express.Router();

router.get("/course/friends/:courseName", getFriendTraineeController);
router.get("/course");

module.exports = router;
