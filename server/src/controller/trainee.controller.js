const database = require("../../database/models");
const {
  searchTraineeService,
  updateTraineeInforService,
  deleteTraineeService,
} = require("../service/trainee.services");

const searchTraineeController = async (req, res) => {
  try {
    const { name, age } = req.query;
    const result = await searchTraineeService(name, age);
    if (result === null)
      return res.status(404).json({
        success: false,
        message: "Cannot found!",
      });
    return res.status(200).json({
      success: true,
      message: "Search successfully!",
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

const updateTraineeInforController = async (req, res) => {
  try {
    const { oldData, newData } = req.body;
    const result = await updateTraineeInforService(oldData, newData);
    if (result === 0)
      return res.status(404).json({
        success: false,
        message: "Nothing Updated",
      });
    return res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const deleteTraineeController = async (req, res) => {
  try {
    const { name, age } = req.body;
    await deleteTraineeService(name, age);
    return res.status(200).json({
      success: true,
      message: "Deleted successully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};
module.exports = {
  searchTraineeController,
  updateTraineeInforController,
  deleteTraineeController,
};
