const {
  getAllFriendsService,
  assignTraineeService,
  kickTraineeServices,
  getCoursesOfTraineeService,
} = require("../service/list-trainee.services");

const getFriendTraineeController = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "The id trainee cannot empty",
    });
  } else {
    try {
      const courseName = req.params.courseName;
      let arraycourse = [];
      const checkExistInCourse = await getCoursesOfTraineeService(id);
      checkExistInCourse.forEach((data) => {
        console.log(data.Class.Course.name);
        arraycourse.push(data.Class.Course.name);
      });
      if (!arraycourse.includes(courseName)) {
        return res.status(400).json({
          success: false,
          message: "The user has not already assigned to this course",
        });
      }
      const result = await getAllFriendsService(courseName);
      return res.status(200).json({
        success: true,
        message: "Fetch friend successfully!",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  }
};

const assignTraineeClassController = async (req, res) => {
  try {
    const { className, emailTrainee } = req.body;
    const result = await assignTraineeService(emailTrainee, className);
    if (result === null) {
      return res.status(400).json({
        success: false,
        message: "The trainee is not exist",
      });
    }
    if (result === false) {
      return res.status(400).json({
        success: false,
        message: "The trainee is unvalid, please check user's email again",
      });
    }
    if (result === "existed") {
      return res.status(400).json({
        success: false,
        message: "This trainee has already been assigned to this class",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Assigned student ${emailTrainee} successfully!`,
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

const kickTraineeController = async (req, res) => {
  try {
    const idTrainee = req.params.id;
    if (!idTrainee) {
      return res.status(400).json({
        success: false,
        message: "The id trainee cannot empty",
      });
    }
    const { className } = req.body;
    const result = await kickTraineeServices(idTrainee, className);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "Cannot find this trainee in class",
        data: result,
      });
    }
    return res.status(200).json({
      success: true,
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

const getCoursesOfTrainee = async (req, res) => {
  const idTrainee = req.params.id;
  if (!idTrainee) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    try {
      const result = await getCoursesOfTraineeService(idTrainee);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
};
module.exports = {
  getFriendTraineeController,
  assignTraineeClassController,
  kickTraineeController,
  getCoursesOfTrainee,
};
