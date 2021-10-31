const {
  getTrainerCoursesService,
  getListTraineesInClassService,
} = require("../service/classes.services");
const {
  getAcountService,
  getAccountsByRoleService
} = require("../service/account.services");
const { findRoleServices } = require("../service/roles.services");
const {updateTrainerInforService} = require("../service/trainer.services");
const {checkExistAccountService}= require("../service/auth.services");


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

const updateTrainerProfile = async (req, res) => {
  const idTrainer = req.params.id;
  if(!idTrainer){
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  }
  try {
    const checkEmailExisted = await checkExistAccountService(req.body.email);
    if (checkEmailExisted) {
      return res.status(400).json({
        success: false,
        message: "Email is used by somebody",
      });
    }
    const newData = {
      fullname: req.body.fullname,
      email: req.body.email,
      age: req.body.age,
      specialty: req.body.specialty
    }
    const result = await updateTrainerInforService(idTrainer,newData);
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
module.exports = {
  getTrainerCourses,
  getListTraineesInClass,
  getTrainerProfile,
  getAllTrainer,
  updateTrainerProfile
};
