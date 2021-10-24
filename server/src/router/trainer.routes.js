const express = require("express");
const router = express.Router();
const {getTrainerCourses,getListTraineesInClass} = require('../controller/trainer.controllers');
const {permission} =require("../middleware/authentiacation.middleware");

router.get("/courses/:id",permission,getTrainerCourses);
router.get("/courses/:id/classes/trainees",permission,getListTraineesInClass);

module.exports = router;