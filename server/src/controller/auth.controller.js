const {
  checkExistAccountService,
  loginAccountService,
  registryAccountService,
} = require("../service/auth.services");
const argon = require("argon2");
const jsonWebToken = require("jsonwebtoken");
const { findRoleServices } = require("../service/roles.services");
const { createTrainerService } = require("../service/trainer.services");
const { createTraineeService } = require("../service/trainee.services");
const { deleteAccountService } = require("../service/account.services");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginAccountService(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const passwordValid = await argon.verify(user.password, password);
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is not correct",
      });
    }

    const token = jsonWebToken.sign(
      { uid: user.id, role: user.Role.name },
      process.env.SECRET_TOKEN_KEY,{expiresIn : '7200s'}
    );
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        uid: user.id,
      },
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const registryController = async (req, res) => {
  let uid = "";
  try {
    const { email, password, fullname, role, age } = req.body;
    console.log(age);
    const existAccount = await checkExistAccountService(email);
    if (existAccount) {
      return res.status(400).json({
        success: false,
        message: "Email is used by somebody",
      });
    }
    const hashPassword = await argon.hash(password);
    const roleID = await findRoleServices(role);
    uid = await registryAccountService(
      email,
      hashPassword,
      fullname,
      roleID,
      age
    );

    switch (role) {
      case "Trainer": {
        const { specialty } = req.body;
        await createTrainerService(uid, specialty);
        break;
      }
      case "Trainee": {
        const { year, education } = req.body;
        await createTraineeService(uid, year, education);
        break;
      }
      default: {
        break;
      }
    }
    return res.status(200).json({
      success: true,
      message: "Register successfully!",
      data: {
        hashPassword: hashPassword,
        roleID: roleID,
      },
    });
  } catch (error) {
    if (uid !== null) {
      await deleteAccountService(uid);
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

module.exports = { loginController, registryController };
