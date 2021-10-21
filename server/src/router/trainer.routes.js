const express = require("express");
const router = express.Router();
const {getTrainerCourses,getListTraineesInClass} = require('../controller/trainer.controllers');
const {authToken, authRole} =require("../middleware/authentiacation.middleware")

router.get("/courses/:id",authToken, authRole("Trainer"), getTrainerCourses);
router.get("/courses/:id/classes/trainees",authToken, authRole("Trainer"),getListTraineesInClass);

module.exports = router;