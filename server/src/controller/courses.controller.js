const { getAllCoursesService } = require("../service/courses.services.js");
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
const createNewCourse = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name of category cannot be empty",
    });
  } else {
    try {
    } catch (error) {
      res.status(400).send({
        msg: error,
      });
    }
  }
};

module.exports = { getAllCourse, createNewCourse };
