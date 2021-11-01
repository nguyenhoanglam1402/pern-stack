const express = require("express");
const {
  getAllCourse,
  createNewCourse,
  getACourseByName,
  updateCourse,
  deleteCourse,
} = require("../controller/courses.controller.js");
const {
  createNewCategory,
  findAllCategory,
  findCategoryByName,
  updateCategory,
  deleteCategory,
} = require("../controller/categories.controller.js");

const {
  registerTraineeController,
} = require("../controller/auth.controller.js");

const {
  createClassController,
  updateClassController,
  deleteClassConotroller,
  getDetailClassesOfCourse,
  getAllClassesController,
  assignTrainerClassController,
} = require("../controller/classes.controller.js");
const {
  assignTraineeClassController,
  kickTraineeController,
} = require("../controller/list-trainee.controller.js");
const {
  searchTraineeController,
  updateTraineeInforController,
  deleteTraineeController,
  changePasswordTrainee,
  getAllTrainee,
} = require("../controller/trainee.controller.js");
const { getAllTrainer } = require("../controller/trainer.controllers");
const router = express.Router();

//Route for course
router.get("/courses", getAllCourse);
router.get("/courses/:name", getACourseByName);
router.post("/courses/create", createNewCourse);
router.put("/courses/update/:id", updateCourse);
router.delete("/courses/delete/:id", deleteCourse);

//Route for course category
router.get("/categories", findAllCategory);
router.get("/categories/:name", findCategoryByName);
router.post("/categories/create", createNewCategory);
router.put("/categories/update/:id", updateCategory);
router.delete("/categories/delete/:name", deleteCategory);

//Route for class
router.get("/classes", getAllClassesController);
router.post("/classes/create", createClassController);
router.post("/classes/trainee", assignTraineeClassController);
router.put("/classes/trainer/assign/:id", assignTrainerClassController);
router.put("/classes/update", updateClassController);
router.delete("/classes/delete/:id", deleteClassConotroller);
router.delete("/classes/trainee/delete/:id", kickTraineeController);
router.get("/classes/:courseName", getDetailClassesOfCourse);

//Route for trainer
router.get("/trainer/view", getAllTrainer);

//Route for trainee management.
router.get("/trainee/view", getAllTrainee);
router.get("/trainee/search", searchTraineeController);
router.put("/trainee/update/:id", updateTraineeInforController);
router.delete("/trainee/delete/:id", deleteTraineeController);
router.patch("/trainee/password/:id", changePasswordTrainee);
router.post("/trainee/register", registerTraineeController);
module.exports = router;
