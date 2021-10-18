const express = require("express");
const {
  getFriendTraineeController,
} = require("../controller/list-trainee.controller");
const router = express.Router();

router.get("/course/friends/:classid", getFriendTraineeController);

module.exports = router;
