const express = require('express');
const { getAllCourse,createNewCourse } = require("../controller/courses.controller.js");
const { createNewCategory, findAllCategory,findCategoryByName } = require("../controller/categories.controller.js");
const router =  express.Router();

//Route for course 
router.get("/courses",getAllCourse);
router.post("/courses/create",createNewCourse);
router.put("/courses/update/:id",(req,res)=>updateCourse);
router.delete("/courses/delete/:id",(req,res)=>deleteCourse);


//Route for course category
router.get("/categories",findAllCategory);
router.get("/categories/:name", findCategoryByName);
router.post("/categories/create",createNewCategory);
router.put("/categories/update/:name",(req,res)=>updateCourse);
router.delete("/categories/delete/:name",(req,res)=>deleteCourse);

module.exports = router;