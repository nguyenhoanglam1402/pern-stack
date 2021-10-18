const {
  getAllCoursesService,
  getAListCoursesByNameService,
  createNewCourseService,
  updateCourseService,
  deleteCourseService,
} = require("../service/courses.services.js");

const getAllCourse = async (req, res) => {
  try {
    const find = await getAllCoursesService();
    return res.status(200).json({
      success: true,
      data: find,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

const getAListCoursesByName = async (req, res) => {
  if (!req.params.name) {
    return res.status(400).json({
      success: false,
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await getAListCoursesByNameService(req.params.name);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
        data: {},
      });
    }
  }
};

const createNewCourse = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await createNewCourseService({
        name: req.body.name,
        categoryName: req.body.categoryName,
        description: req.body.description,
      });
      if (result === null) {
        return res.status(400).json({
          success: false,
          message: "Category is not exist",
        });
      }
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        msg: error,
      });
    }
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (courseId === null || req.body.categoryName === "") {
      return res.status(400).json({
        success: false,
        message: "No needed id parameter/category name inside request",
      });
    }
    const result = await updateCourseService(courseId, {
      name: req.body.name,
      categoryName: req.body.categoryName,
      description: req.body.description,
    });
    return res.status(200).json({
      success: true,
      message: "Updated successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteCourseService(id);
    return res.status(200).json({
      success: true,
      message: "Update is successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message
    });
  }
};

module.exports = {
  getAllCourse,
  createNewCourse,
  getAListCoursesByName,
  updateCourse,
  deleteCourse,
};
