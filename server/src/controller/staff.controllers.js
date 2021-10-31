const {
  changePasswordService,
  getRoleByIdService,
  deleteAccountService,
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

const deleteSystemStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const checkingRole = await getRoleByIdService(id);
    if (
      checkingRole.Role.name === "Trainee" ||
      checkingRole.Role.name === "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You don't have permission to delete this role! User must be trainer or training staff",
      });
    }
    await deleteAccountService(id);
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
module.exports = { changePasswordSystemStaffController, deleteSystemStaff };
