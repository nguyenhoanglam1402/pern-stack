const {
  getAllFriendsService,
  assignTraineeService,
} = require("../service/list-trainee.services");

const getFriendTraineeController = async (req, res) => {
  try {
    const classId = req.params.classid;
    const result = await getAllFriendsService(classId);
    console.log(result);
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

module.exports = { getFriendTraineeController, assignTraineeClassController };
