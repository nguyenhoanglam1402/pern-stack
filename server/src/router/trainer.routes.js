const express = require("express");
const router = express.Router();
const {getTrainerCourses,getListTraineesInClass} = require('../controller/trainer.controllers');


router.get("/courses/:id", getTrainerCourses);
router.get("/courses/:id/classes/trainees",getListTraineesInClass);

module.exports = router;