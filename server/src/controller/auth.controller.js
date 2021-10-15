const {
  checkExistAccountService,
  loginAccountService,
  registryAccountService,
} = require("../service/auth.services");
const argon = require("argon2");
const jsonWebToken = require("jsonwebtoken");
const { findRoleServices } = require("../service/roles.services");

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
      { userId: user.id },
      process.env.SECRET_TOKEN_KEY
    );
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: user,
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
  try {
    const { email, password, fullname, role } = req.body;
    const existAccount = await checkExistAccountService(email);
    if (existAccount) {
      return res.status(400).json({
        success: false,
        message: "Email is used by somebody",
      });
    }
    const hashPassword = await argon.hash(password);
    const roleID = await findRoleServices(role);
    await registryAccountService(email, hashPassword, fullname, roleID);
    return res.status(200).json({
      success: true,
      message: "Register successfully!",
      data: {
        hashPassword: hashPassword,
        roleID: roleID,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { loginController, registryController };
