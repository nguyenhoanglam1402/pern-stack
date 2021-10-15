const {
  getAllCoursesService,
  getAListCoursesByNameService,
  createNewCourseService,
} = require("../service/courses.services.js");
const getAllCourse = async (req, res) => {
  try {
    const find = await getAllCoursesService();
    return res.status(200).json({
      success: "Success",
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
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await getAListCoursesByNameService(req.params.name);
      return res.status(200).json({
        success: "Success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
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
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await createNewCourseService({
        name: req.body.name,
        categoryName: req.body.categoryName,
        description: req.body.description,
      });
      if (result === null){
        return res.status(400).json({
          success: "Failed",
          message: "Category is not exist",
        })
      }
      return res.status(200).json({
        success: "Success",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        msg: error,
      });
    }
  }
};

module.exports = { getAllCourse, createNewCourse, getAListCoursesByName };
