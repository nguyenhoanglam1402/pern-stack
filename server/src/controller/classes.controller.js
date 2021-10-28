const {
  createClassService,
  deleteClassService,
  updateClassService,
  findClassesByCourseService,
  getAllClassServices,
  assignTrainerClassService,
} = require("../service/classes.services");
const { findCourseIDService } = require("../service/courses.services");

const getAllClassesController = async (req, res) => {
  try {
    const result = await getAllClassServices();
    return res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      errorMessage: error.message,
    });
  }
};

const createClassController = async (req, res) => {
  try {
    const { courseName, trainerID, name } = req.body;
    const result = await createClassService(courseName, name, trainerID);
    if (result == null) {
      return res.status(404).json({
        success: false,
        message: "There is no Course which you chosen",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteClassConotroller = async (req, res) => {
  try {
    const { courseName, trainerID, name } = req.body;
    const result = await deleteClassService(name, trainerID, courseName);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "There is no class as you want",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      errorMessage: error.message,
    });
  }
};

const assignTrainerClassController = async (req, res) => {
  try {
    const id = req.params.id;
    const { className } = req.body;
    console.log("Server recieved: ", id, " and className: ", className);
    const result = await assignTrainerClassService(id, className);
    return res.status(200).json({
      success: true,
      message: "Resquest OK!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

const updateClassController = async (req, res) => {
  try {
    const { id, name, trainerEmail, courseName } = req.body;
    const data = {
      id: id,
      name: name,
      trainerEmail: trainerEmail,
      courseName: courseName,
    };
    const result = await updateClassService(data);
    if (result === false) {
      return res.status(400).json({
        success: false,
        message: "This user is not a trainer",
      });
    }
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "Cannot found the record which you want",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

const getDetailClassesOfCourse = async (req, res) => {
  const courseName = req.params.courseName;
  if (!courseName) {
    return res.status(400).json({
      success: false,
      message: "Name of course cannot be empty",
    });
  }
  try {
    const courseID = await findCourseIDService(courseName);
    const result = await findClassesByCourseService(courseID.dataValues.id);
    if (result === null) {
      return res.status(400).json({
        success: false,
        message: "This course don't have any classes",
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

module.exports = {
  getAllClassesController,
  createClassController,
  deleteClassConotroller,
  updateClassController,
  getDetailClassesOfCourse,
  assignTrainerClassController,
};
