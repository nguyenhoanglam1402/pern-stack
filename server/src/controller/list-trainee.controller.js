const {
  getAllFriendsService,
  assignTraineeService,
  kickTraineeServices,
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
    const { className, traineeID } = req.body;
    await assignTraineeService(traineeID, className);
    return res.status(200).json({
      success: true,
      message: `Assigned student ${traineeID} successfully!`,
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

module.exports = {
  getFriendTraineeController,
  assignTraineeClassController,
  kickTraineeController,
};
