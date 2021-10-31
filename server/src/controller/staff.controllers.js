const {
    changePasswordService,
    getRoleByIdService,
  } = require("../service/account.services");
const argon = require("argon2");

const changePasswordSystemStaffController = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "The id cannot empty",
    });
  } else {
    const checkingRole = await getRoleByIdService(id);
    if (
      checkingRole.Role.name === "Trainee" ||
      checkingRole.Role.name === "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot change password of trainee or admin",
      });
    }
    try {
      const hashPassword = await argon.hash(req.body.newPassword);
      const result = await changePasswordService(id, hashPassword);
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

module.exports = {changePasswordSystemStaffController}