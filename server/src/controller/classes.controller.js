const {
  createClassService,
  deleteClassService,
  updateClassService,
} = require("../service/classes.services");

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

const updateClassController = async (req, res) => {
  try {
    const { id, name, trainerID, courseName } = req.body;
    const data = {
      id: id,
      name: name,
      trainerID: trainerID,
      courseName: courseName,
    };
    const result = await updateClassService(data);
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
      error: error.message
    });
  }
};



module.exports = {
  createClassController,
  deleteClassConotroller,
  updateClassController,
};
