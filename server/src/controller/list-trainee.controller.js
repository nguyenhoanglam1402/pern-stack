const {
  getAllFriendsService,
  assignTraineeService,
  kickTraineeServices,
  getCoursesOfTraineeService,
} = require("../service/list-trainee.services");

const getFriendTraineeController = async (req, res) => {
  try {
    const courseName = req.params.courseName;
    console.log("Course name", courseName);
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
    const { name, age, className } = req.body;
    console.log(`Name: ${name}, Age: ${age}, Class ${className}`);
    await kickTraineeServices(name, age, className);
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
        error: error,
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
