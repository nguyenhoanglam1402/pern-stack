const {
  searchTraineeService,
  updateTraineeInforService,
} = require("../service/trainee.services");
const {
  getAcountService,
  changePasswordService,
  getRoleByIdService,
  getAccountsByRoleService,
  deleteAccountService,
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
  const idTrainee = req.params.id;
  if (!idTrainee) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  }
  try {
    const checkRole = await getRoleByIdService(idTrainee);
    if (checkRole.Role.name !== "Trainee") {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to update this role",
      });
    }
    const newData = {
      fullname: req.body.fullname,
      age: req.body.age,
      education: req.body.education,
      year: req.body.year,
    };
    const result = await updateTraineeInforService(idTrainee, newData);
    return res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
};

const deleteTraineeController = async (req, res) => {
  try {
    const idTrainee = req.params.id;
    const checkingRole = await getRoleByIdService(idTrainee);
    if (checkingRole.Role.name !== "Trainee") {
      return res.status(400).json({
        success: false,
        message:
          "You don't have permission to delete this role! User must be trainee",
      });
    }
    await deleteAccountService(idTrainee);
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

const getTraineeProfile = async (req, res) => {
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
};

const changePasswordTrainee = async (req, res) => {
  const idTrainee = req.params.id;
  if (!idTrainee) {
    return res.status(400).json({
      success: false,
      message: "The id trainee cannot empty",
    });
  } else {
    const checkingRole = await getRoleByIdService(idTrainee);
    if (checkingRole.Role.name !== "Trainee") {
      return res.status(400).json({
        success: false,
        message: "The id's user is not trainee",
      });
    }
    try {
      const hashPassword = await argon.hash(req.body.newPassword);
      const result = await changePasswordService(idTrainee, hashPassword);
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
};
const getAllTrainee = async (req, res) => {
  try {
    const roleID = await findRoleServices("Trainee");
    const result = await getAccountsByRoleService("Trainee", roleID);
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
};
module.exports = {
  searchTraineeController,
  updateTraineeInforController,
  deleteTraineeController,
  getTraineeProfile,
  changePasswordTrainee,
  getAllTrainee,
};
