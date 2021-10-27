const {
  searchTraineeService,
  updateTraineeInforService,
  deleteTraineeService
} = require("../service/trainee.services");
const {
  getAcountService,
  getPasswordService,
  changePasswordService,
  getRoleByIdService,
  getAccountsByRoleService
} = require("../service/account.services");
const argon = require("argon2");
const { findRoleServices } = require("../service/roles.services");
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
    const idTrainee = req.params.id;
    await deleteTraineeService(idTrainee);
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
}

const getTraineeProfile = async (req,res) => {
  const idTrainee = req.params.id;
  if (!idTrainee) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    try {
      const result = await getAcountService(idTrainee);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
}

const changePasswordTrainee = async (req,res) => {
  const idTrainee = req.params.id;
  if(!idTrainee){
    return res.status(400).json({
      success: false,
      message: "The id trainee cannot empty",
    });
  }
  else{
    const checkingRole = await getRoleByIdService(idTrainee);
    if(checkingRole.Role.name!=="Trainee"){
      return res.status(400).json({
        success: false,
        message: "The id's user is not trainee",
      });
    }
    try {
      const oldPassword = await getPasswordService(idTrainee);
      const passwordValid = await argon.verify(oldPassword.password, req.body.oldPassword);
      if(!passwordValid){
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect"
        })
      }else{
        const hashPassword = await argon.hash(req.body.newPassword);
        const result = await changePasswordService(idTrainee,hashPassword);
        return res.status(200).json({
          success: true,
          data: result,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
}
const getAllTrainee = async (req,res) => {
  try {
    const roleID = await findRoleServices("Trainee")
    const result = await getAccountsByRoleService("Trainee",roleID);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
}
module.exports = {
  searchTraineeController,
  updateTraineeInforController,
  deleteTraineeController,
  getTraineeProfile,
  changePasswordTrainee,
  getAllTrainee
};
