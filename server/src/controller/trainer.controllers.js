const {
  getTrainerCoursesService,
  getListTraineesInClassService,
} = require("../service/classes.services");
const {
  getAcountService,
  getRoleByIdService,
  getPasswordService,
  changePasswordService,
  getAccountsByRoleService
} = require("../service/account.services");
const { findRoleServices } = require("../service/roles.services");
const argon = require("argon2");
const getTrainerCourses = async (req, res) => {
  const idTrainer = req.params.id;
  if (!idTrainer) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    try {
      const result = await getTrainerCoursesService(idTrainer);
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

const getListTraineesInClass = async (req, res) => {
  const idTrainer = req.params.id;
  console.log(req.query.classname);
  if (!idTrainer) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    try {
      const result = await getListTraineesInClassService(
        idTrainer,
        req.query.classname
      );
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

const getTrainerProfile = async (req, res) => {
  const idTrainer = req.params.id;
  if (!idTrainer) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    try {
      const result = await getAcountService(idTrainer);
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
const changePasswordTrainer = async (req, res) => {
  const idTrainer = req.params.id;
  if (!idTrainer) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    const checkingRole = await getRoleByIdService(idTrainee);
    if (checkingRole.Role.name !== "Trainer") {
      return res.status(400).json({
        success: false,
        message: "The id's user is not trainer",
      });
    }
    try {
      const oldPassword = await getPasswordService(idTrainee);
      const passwordValid = await argon.verify(
        oldPassword.password,
        req.body.oldPassword
      );
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect",
        });
      } else {
        const hashPassword = await argon.hash(req.body.newPassword);
        const result = await changePasswordService(idTrainee, hashPassword);
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
};
const getAllTrainer = async (req,res) => {
  try {
    const roleID = await findRoleServices("Trainer")
    const result = await getAccountsByRoleService("Trainer",roleID);
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
const updateTrainerProfile = async (req, res) => {};
module.exports = {
  getTrainerCourses,
  getListTraineesInClass,
  getTrainerProfile,
  changePasswordTrainer,
  getAllTrainer
};
