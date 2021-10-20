const express = require("express");
const {
  getAllCourse,
  createNewCourse,
  getAListCoursesByName,
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
  loginController,
  registryController,
} = require("../controller/auth.controller.js");

const {
  createClassController,
  updateClassController,
  deleteClassConotroller,
} = require("../controller/classes.controller.js");
const {
  assignTraineeClassController,
} = require("../controller/list-trainee.controller.js");
const router = express.Router();

//Route for course
router.get("/courses", getAllCourse);
router.get("/courses/:name", getAListCoursesByName);
router.post("/courses/create", createNewCourse);
router.put("/courses/update/:id", updateCourse);
router.delete("/courses/delete/:id", deleteCourse);

//Route for course category
router.get("/categories", findAllCategory);
router.get("/categories/:name", findCategoryByName);
router.post("/categories/create", createNewCategory);
router.put("/categories/update/:id", updateCategory);
router.delete("/categories/delete/:name", deleteCategory);

//Route for account
router.post("/auth/login", loginController);
router.post("/auth/register", registryController);

//Route for class
router.post("/classes/create", createClassController);
router.post("/classes/trainee", assignTraineeClassController);
router.put("/classes/update", updateClassController);
router.delete("classes/delete/:id", deleteClassConotroller);
module.exports = router;
